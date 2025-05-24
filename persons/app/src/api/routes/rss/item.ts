import { procedure } from '@/api/trpc/procedures'
import { sendMail } from '@wzyjs/utils/node'
import { z } from 'zod'

export const rssItem = {
  sendEmail: procedure
  .input(z.object({
    where: z.object({
      isSent: z.boolean().optional(),
      isInterested: z.number(),
      createdAt: z.object({
        gte: z.string().optional(),
        lt: z.string().optional(),
      }).optional(),
    }),
  }))
  .mutation(async ({ ctx, input }) => {
    // 获取所有未发送的内容
    const items = await ctx.db.rssItem.findMany({
      where: {
        isDeleted: false,
        ...input.where,
      },
      include: {
        feed: {
          select: { id: true, name: true },
        },
      },
    })

    if (items.length === 0) {
      return {
        success: false,
        message: '没有找到未发送的内容',
      }
    }

    if (items.length < 5) {
      return {
        success: false,
        message: '未发送的内容数量 < 5',
      }
    }

    // 拼接内容
    const contents = items.map(item => {
      return `
    <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">${item.summary}</h2>
        <a
          href="https://app.zhenyu.pro/api/rss/star?id=${item.id}"
          target="_blank"
          style="background-color: #1a73e8; color: white; text-decoration: none; border-radius: 4px; padding: 6px 12px; cursor: pointer; font-size: 14px; display: inline-block;"
        >
          收藏
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">来源: <strong>${item.feed.name}</strong></p>
      <p style="font-size: 16px; color: #444;">${item.content || item.description || ''}</p>
    </div>
  `
    }).join('')

    const email = '1980833327@qq.com'
    // const email = 'wangzhenzhen2023@gmail.com'
    // const email = 'wangzhenzhen2026@gmail.com'

    try {
      await sendMail({
        to: email,
        subject: `RSS Summary ${input.where.isInterested === 0 ? '[not]' : ''} (${items.length})`,
        html: `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: 0 auto;">
      <style>
         image, video {
            max-width: 100%;
         }
      </style>
      <h1 style="text-align: center; color: #1a73e8;">RSS AI总结</h1>
      <p style="font-size: 16px; color: #444;">以下是您的RSS订阅内容总结：</p>
      <div style="margin-top: 20px;">
        ${contents}
      </div>
      <p style="font-size: 16px; color: #444; margin-top: 20px;">祝您阅读愉快！</p>
    </div>
  `,
      })

      // 更新所有项目为已发送
      await ctx.db.rssItem.updateMany({
        where: {
          id: {
            in: items.map(item => item.id),
          },
        },
        data: {
          isSent: true,
        },
      })

      return {
        success: true,
        message: `成功发送${items.length}条内容到${email}`,
        count: items.length,
      }
    } catch (error: any) {
      console.error('发送邮件失败:', error)
      return {
        success: false,
        message: `发送邮件失败: ${error.message}`,
        error: error.message,
      }
    }
  }),

  markAllAsRead: procedure
  .input(z.object({
    where: z.object({}).optional(),
  }))
  .mutation(async ({ ctx, input }) => {
    try {
      const result = await ctx.db.rssItem.updateMany({
        where: {
          isRead: false,
          isDeleted: false,
          ...input.where,
        },
        data: {
          isRead: true,
        },
      })

      return {
        success: true,
        message: `成功将 ${result.count} 条内容标记为已读`,
        count: result.count,
      }
    } catch (error: any) {
      console.error('标记已读失败:', error)
      return {
        success: false,
        message: `标记已读失败: ${error.message}`,
        error: error.message,
      }
    }
  }),
}
