export * from '@wzyjs/utils/node'
export * from '@wzyjs/midway/utils'

export * from './splitImage'
export * from './handleVideo'

export const generateRelations = (relation: string, depth: number): string[] => {
  return Array.from({ length: depth }, (_, index) =>
    Array(index + 1).fill(relation).join('.'),
  )
}

export const validateParams = (params: Record<string, any>, requiredFields: string[]) => {
  requiredFields.forEach(field => {
    if (!params[field]) {
      throw new Error(`添加失败，${field} 不能为空`)
    }
  })
}
