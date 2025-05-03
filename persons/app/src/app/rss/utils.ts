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
export const getRssItemSearchParams = (values: any) => {
  return {
    search: values.search || '',
    feedIds: values.feedIds || [],
    tags: values.tags || [],
    isRead: values.isRead === 'true' ? true : values.isRead === 'false' ? false : undefined,
    isStarred: values.isStarred === 'true' ? true : values.isStarred === 'false' ? false : undefined,
    pubDateStart: values.pubDate?.[0] ? new Date(values.pubDate[0]).toISOString() : undefined,
    pubDateEnd: values.pubDate?.[1] ? new Date(values.pubDate[1]).toISOString() : undefined,
  }
}

/**
 * 从订阅源列表中提取所有标签
 * @param feeds RSS订阅源列表
 * @returns 标签选项列表
 */
export const extractTagsFromFeeds = (feeds: any[] = []) => {
  return Array.from(
    new Set(
      feeds.flatMap(feed => feed.tags || []),
    ),
  ).map(tag => ({ label: tag, value: tag }))
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
