import { z } from 'zod'
import { procedure } from '@/api/trpc/procedures'

const getPrompt = (infoList: any[], content: string) => {
  let processedContent = content

  if (content && infoList.length > 0) {
    // 匹配@开头直到换行符的内容，可以包含空格
    const mentionRegex = /@([^\n@]+?)(?=\n|@|$)/g

    // 替换所有@信息名称为实际内容
    processedContent = content.replace(mentionRegex, (match, title) => {
      const trimmedTitle = title.trim()
      const info = infoList.find(info => info.title === trimmedTitle)
      return info ? info.content || match : match
    })
  }

  return processedContent
}

export const aiRole = {
  getPrompt: procedure
  .input(z.object({
    id: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    const infoList = await ctx.db.aiInfo.findMany()

    const roleInfo = await ctx.db.aiRole.findUnique({
      where: {
        id: input.id,
      },
    })

    if (!roleInfo?.content) {
      return ''
    }

    return getPrompt(infoList, roleInfo.content)
  }),
}
