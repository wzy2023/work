import { z } from 'zod'
import { procedure } from '@/api/trpc/procedures'
import { fetchRssFeed, parseRssXml, truncateString } from '@/api/utils/fetch'
import { RssFetchTriggerType } from '@/api/types'
import { ai302 } from '@wzyjs/utils/node'

// 处理每条新抓取的数据，使用 AI 生成标签和摘要
const aiSummary = async (item: any) => {
  const prompt = `
请分析以下 RSS 文章，并提供以下两部分内容：
1. 内容的关键词标签，一定要恰当（0 到 5 个，可为空数组）
2. 30 字以内的中文摘要，从读者的角度出发，让人一眼明白是什么内容，可为空字符串

请以 JSON 格式返回，格式为 {"tags": ["标签1","标签2","标签3"], "summary": "摘要内容"}

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
        const xmlContent = await fetchRssFeed('http://localhost:1200' + feed.url)
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
