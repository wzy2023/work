/**
 * 确保链接以http或https开头
 * @param url 原始URL
 * @returns 确保以http或https开头的URL
 */
export const ensureHttpPrefix = (url: string): string => {
  if (url && !(/^https?:\/\//.exec(url))) {
    return 'http://' + url
  }
  return url
}

/**
 * 获取RSS项目的搜索参数
 * @param values 表单值
 * @returns 处理后的搜索参数
 */
export const getRssItemSearchParams = (values: Record<string, any>) => {
  // 处理日期
  let pubDateStart, pubDateEnd
  if (values.pubDate?.length === 2) {
    [pubDateStart, pubDateEnd] = values.pubDate
  }

  return {
    search: values.search || '',
    feedIds: values.feedIds || [],
    tags: values.tags || [],
    isRead: values.isRead,
    isStarred: values.isStarred,
    pubDateStart,
    pubDateEnd,
  }
}

/**
 * 从订阅源列表中提取所有标签
 * @param feeds RSS订阅源列表
 * @returns 标签选项列表
 */
export const extractTagsFromFeeds = (feeds: any[]) => {
  const tags = new Set<string>()
  feeds?.forEach(feed => {
    if (feed.tags && Array.isArray(feed.tags)) {
      feed.tags.forEach((tag: string) => tags.add(tag))
    }
  })

  return Array.from(tags).map(tag => ({ label: tag, value: tag }))
}

/**
 * 将订阅源转换为选项格式
 * @param feeds RSS订阅源列表
 * @returns 选项列表
 */
export const feedsToOptions = (feeds: any[] = []) => {
  return feeds.map(feed => ({
    label: feed.name,
    value: feed.id,
  }))
}
