import { z } from 'zod'
import { procedure } from '@/api/trpc/procedures'
import { fetchRssFeed, parseRssXml, truncateString } from '@/api/utils/fetch'
import { RssFetchTriggerType } from '@/api/types'
import { ai302 } from '@wzyjs/utils/node'
import { env } from '@/env'

// 处理每条新抓取的数据，使用 AI 生成标签和摘要
const aiSummary = async (item: any) => {
  const prompt = `
请分析以下 RSS 文章，并提供以下三部分内容：
1. 内容的关键词标签，一定要恰当（0 到 5 个，可为空数组）
2. 30 字以内的中文摘要，从读者的角度出发，让人一眼明白是什么内容，可为空字符串
3. 请基于以下列表，判断我是否对此内容感兴趣，-1代表不感兴趣，1代表感兴趣，0代表无法判断。

  以下是我感兴趣的内容：
   - 代码开发相关的
   - 新技术、新产品 (App、网站、工具等等)
   - AI方面的所有 (应用、工具、画图、提示词等等，只要涉及ai就感兴趣)
   - 个人效率与时间管理
   - 独立开发产品、运营流量获客、用户增长相关的

   以下是我不我感兴趣的内容：
   - 无意义的内容或纯图片
   - 娱乐八卦与明星新闻
   - 体育赛事与直播
   - 宠物养成与萌宠分享
   - 个人生活琐事分享
   - 无脑或低质量短内容
   - 宗教或玄学类话题（如星座运势）
   - 政治与国际关系话题
   - 股票相关话题
   - 传统制造业或重工业相关资讯
   - 原始农业或户外生存内容
   - 网络吵架或饭圈文化

请以 JSON 格式返回，格式为 {"tags": ["标签1","标签2","标签3"], "summary": "摘要内容", "isInterested": -1/1}

文章标题: ${item.title}
文章内容: ${item.content || item.description || ''}
`
  return await ai302.chat(prompt, 'gpt-4.1-mini')
}

export const rssFeed = {
  getCountByFeed: procedure
  .query(async ({ ctx }) => {
    const counts = await ctx.db.rssItem.groupBy({
      by: ['feedId'],
      where: {
        isDeleted: false,
      },
      _count: {
        id: true,
      },
    })

    return counts.map(item => ({
      feedId: item.feedId,
      count: item._count.id,
    }))
  }),

  batchFetchNow: procedure
  .input(z.object({
    triggerType: z.nativeEnum(RssFetchTriggerType),
    ids: z.array(z.string()).optional(),
  }).optional())
  .mutation(async ({ ctx, input }) => {
    const { triggerType = RssFetchTriggerType.Scheduled, ids } = input || {}

    const feeds = await ctx.db.rssFeed.findMany({
      where: {
        ...(ids ? { id: { in: ids } } : { enabled: true }),
      },
    })

    if (feeds.length === 0) {
      return {
        success: false,
        message: '没有找到启用的订阅源',
        successCount: 0,
        errorCount: 0,
      }
    }

    // 记录成功和失败的订阅源详情
    const successFeeds: { id: string, name: string, newItemCount: number }[] = []
    const failedFeeds: { id: string, name: string, error: string }[] = []

    // 依次抓取每个订阅源
    for (const feed of feeds) {
      try {
        // 抓取RSS内容
        const xmlContent = await fetchRssFeed(env.RSSHUB_BASE_URL + feed.url)
        const parsedFeed = parseRssXml(xmlContent)

        // 保存抓取的内容
        let feedSuccessCount = 0

        for (const item of parsedFeed.items) {
          try {
            // 检查是否已存在相同链接的内容
            const existingItem = await ctx.db.rssItem.findFirst({
              where: {
                link: item.link,
                isDeleted: false,
              },
            })

            if (!existingItem) {
              // 创建新内容，确保所有文本字段不超长
              await ctx.db.rssItem.create({
                data: {
                  title: truncateString(item.title, 191),
                  description: truncateString(item.description, 500),
                  content: truncateString(item.content, 1000),
                  link: truncateString(item.link, 191),
                  pubDate: item.pubDate || new Date(),
                  feedId: feed.id,
                  ...(await aiSummary(item) || {}),
                },
              })
              feedSuccessCount++
            }
          } catch (itemError) {
            console.error('保存RSS内容项失败:', itemError)
          }
        }

        // 记录抓取日志
        await ctx.db.rssFetchLog.create({
          data: {
            feedId: feed.id,
            status: 'success',
            triggerType,
            executedAt: new Date(),
            errorMessage: '',
            itemCount: feedSuccessCount,
          },
        })

        // 添加到成功列表
        successFeeds.push({
          id: feed.id,
          name: feed.name || feed.url,
          newItemCount: feedSuccessCount,
        })
      } catch (feedError: any) {
        console.error(`抓取订阅源 ${feed.id} 失败:`, feedError)

        // 记录失败日志
        await ctx.db.rssFetchLog.create({
          data: {
            feedId: feed.id,
            status: 'error',
            triggerType,
            executedAt: new Date(),
            errorMessage: truncateString(feedError?.message || '未知错误', 191),
            itemCount: 0,
          },
        })

        // 添加到失败列表
        failedFeeds.push({
          id: feed.id,
          name: feed.name || feed.url,
          error: feedError?.message || '未知错误',
        })
      }
    }

    return {
      successFeeds,
      failedFeeds,
    }
  }),
}
