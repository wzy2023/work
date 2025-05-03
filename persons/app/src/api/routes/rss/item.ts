import { procedure } from '@/api/trpc/procedures'
// import { sendMail } from '@wzyjs/utils/node'

const sendMail = (a, b, c) => {
  console.log(666, 5, a, b, c)
}

export const rssItem = {
  aiSummary: procedure
  .mutation(async ({ ctx }) => {
    // 获取所有未发送的内容
    const items = await ctx.db.rssItem.findMany({
      where: {
        isDeleted: false,
        // isSent: false,
      },
      include: {
        feed: {
          select: {
            id: true,
            name: true,
          },
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
## ${item.title}

来源: ${item.feed.name}

${item.content || item.description || ''}

---
`
    }).join('\n')

    const email = 'wangzhenzhen2023@gmail.com'

    try {
      sendMail(
        email,
        `RSS AI总结 - ${new Date().toLocaleDateString()}`,
        `<div style="font-family: Arial, sans-serif;">
          <h1>RSS AI总结</h1>
          <p>以下是您的RSS订阅内容总结：</p>
          <div>
            ${contents.replace(/\n/g, '<br>')}
          </div>
          <p>祝您阅读愉快！</p>
        </div>`,
      )

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
}
