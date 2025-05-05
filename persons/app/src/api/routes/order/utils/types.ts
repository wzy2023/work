export enum NeedJobSource {
  Cxykz = '程序员客栈',
  Jjzb = '匠迹众包',
  Yjs = '猿急送',
  Ms = '码市',
  Dy = '电鸭',
  Sx = '实现',
  Xmf = '小蜜蜂',
  Txgc = '甜馨工场',
  Yg = '云工',
}

export enum NeedJobType {
  Need = 'need',
  Job = 'job',
}

export interface Info {
  name: NeedJobSource,
  type: NeedJobType,
  fn: () => Promise<any[]>
}
