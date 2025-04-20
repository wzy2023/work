export interface Params extends Record<string, string | undefined> {
  projectId: string
}

export enum MaterialType {
  EMPTY = 'empty',
  GROUP = 'group',
  TEXT = 'text',
  PROMPT = 'prompt',
  IMAGECREATE = 'imageCreate',
  IMAGE = 'image',
  VIDEO = 'video',
  VIDEOHANDLE = 'videoHandle',
}

export const filterOptions = [
  { value: MaterialType.GROUP, label: '全部', num: 0 },
  { value: MaterialType.TEXT, label: '文本', num: 1 },
  { value: MaterialType.PROMPT, label: '提示词', num: 2 },
  { value: MaterialType.IMAGE, label: '图片', num: 3 },
  { value: MaterialType.VIDEOHANDLE, label: '视频', num: 4 },
]

export enum MaterialStatus {
  Done = 'done',
  Doing = 'doing',
  Failed = 'failed',
}

export enum MaterialSourceType {
  Import = 'import',
  Generate = 'generate',
  Handle = 'handle',
}

export enum AccountLoginStatus {
  NotLoggedIn = 0,
  LoggedIn = 1,
  Scanned = 2
}

export enum AccountPlatform {
  DouYin = 'douYin',
  ShiPinHao = 'shiPinHao',
  XiaoHongShu = 'xiaoHongShu',
  KuaiShou = 'kuaiShou',
  TikTok = 'tikTok',
}

export enum WorkPublishStatus {
  Draft = 'draft',
  Published = 'published',
  Rejected = 'rejected',
}

export enum ReleaseStatus {
  Success = 'success',
  Fail = 'fail',
  PartialSuccess = 'partialSuccess',
}
