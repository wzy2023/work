import { type RssFeed, type RssFetchLog, type RssItem } from '@prisma/client'

export enum RssFrequency {
  Minutes5 = 'minutes5',
  Minutes10 = 'minutes10',
  Minutes20 = 'minutes20',
  Minutes30 = 'minutes30',
  Hourly = 'hourly',
  Daily = 'daily',
  Weekly = 'weekly',
}

export enum RssFetchTriggerType {
  Manual = 'manual',
  Scheduled = 'scheduled',
}

export enum RssItemActionType {
  /** 标记为已读 */
  MarkAsRead = 'markAsRead',
  /** 标记为未读 */
  MarkAsUnread = 'markAsUnread',
  /** 收藏 */
  Star = 'star',
  /** 取消收藏 */
  Unstar = 'unstar',
  /** 打开链接 */
  OpenLink = 'openLink',
}

export enum RssFeedActionType {
  /** 编辑 */
  Edit = 'edit',
  /** 删除 */
  Delete = 'delete',
  /** 启用 */
  Enable = 'enable',
  /** 禁用 */
  Disable = 'disable',
  /** 抓取 */
  Fetch = 'fetch',
}

declare global {
  export namespace Rss {
    export type Item = RssItem;
    export type Feed = RssFeed;
    export type FetchLog = RssFetchLog;

    export import Type = RssFrequency
    export import FetchTriggerType = RssFetchTriggerType
    export import FeedActionType = RssFeedActionType
    export import ItemActionType = RssItemActionType
  }
}
