import { db } from '@/api/trpc/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: '缺少必要参数 id' },
        { status: 400 },
      )
    }

    // 更新 RSS 条目
    const result = await db.rssItem.update({
      where: { id },
      data: { isStarred: true },
    })

    return NextResponse.json({
      success: true,
      message: '收藏成功',
      data: result,
    })
  } catch (error: any) {
    console.error('收藏失败:', error)
    return NextResponse.json(
      { success: false, message: `收藏失败: ${error.message}` },
      { status: 500 },
    )
  }
}
