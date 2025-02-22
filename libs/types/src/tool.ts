// 将指定 key 设为可选
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// 将指定类型排除、将指定类型设为可选
export type Set<T, OmitK extends keyof T = never, OptionalK extends Exclude<keyof T, OmitK> = never> = Optional<Omit<T, OmitK>, OptionalK>

// 键值对
export type KeyValue<D extends object | string = string, V = any> = Partial<Record<D extends string ? string : keyof D, V>>
