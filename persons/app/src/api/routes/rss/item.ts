import { procedure } from '@/api/trpc/procedures'
import { sendMail } from '@wzyjs/utils/node'

export const rssItem = {
  aiSummary: procedure
  .mutation(async ({ ctx }) => {
    // 获取所有未发送的内容
    const items = await ctx.db.rssItem.findMany({
      where: {
        isDeleted: false,
        isSent: false,
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

    // 拼接内容
    const contents = items.map(item => {
      return `
    <div style="border-bottom: 1px solid #ddd; padding: 15px 0;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">${item.summary}</h2>
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
        subject: `RSS Summary (${contents.length})`,
        html: `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: 0 auto;">
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
  .mutation(async ({ ctx }) => {
    try {
      const result = await ctx.db.rssItem.updateMany({
        where: {
          isRead: false,
          isDeleted: false,
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
