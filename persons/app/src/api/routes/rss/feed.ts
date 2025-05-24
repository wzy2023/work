import { z } from 'zod'
import { ai302 } from '@wzyjs/utils/node'

import { procedure } from '@/api/trpc/procedures'
import { RssFetchTriggerType } from '@/api/types'
import { fetchRssFeed, parseRssXml } from '@/api/utils/fetch'

import { env } from '@/env'

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
              const summaryRole = await ctx.db.aiRole.findUnique({
                where: {
                  id: 'cmb2dw3t7003h131cfvhagaz1',
                },
              })

              const prompt = summaryRole?.content
              .replaceAll('{文章标题}', item.title)
              .replaceAll('{文章内容}', item.content || item.description || '')

              if (!prompt) {
                return
              }

              const aiSummary = await ai302.chat(prompt, 'gpt-4.1-mini')

              // 创建新内容，确保所有文本字段不超长
              await ctx.db.rssItem.create({
                data: {
                  title: item.title,
                  description: item.description,
                  content: item.content,
                  link: item.link,
                  pubDate: item.pubDate || new Date(),
                  feedId: feed.id,
                  ...(aiSummary || {}),
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
            errorMessage: feedError?.message || '未知错误',
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
