import _ from 'lodash'

type Id = string | number

export class Chain<T extends { id: Id }> {
  private items: T[]

  constructor(items: T[] = []) {
    this.items = items
  }

  add(items: T | T[]): Chain<T> {
    const itemsArray = Array.isArray(items) ? items : [items]
    this.items.push(...itemsArray)
    return this
  }

  remove(items: T | T[]): Chain<T> {
    const itemsArray = Array.isArray(items) ? items : [items]
    const itemIds = itemsArray.map(item => item.id)
    this.items = this.items.filter(item => !itemIds.includes(item.id))
    return this
  }

  removeById(ids: Id | Id[]): Chain<T> {
    const idsArray = Array.isArray(ids) ? ids : [ids]
    this.items = this.items.filter(item => !idsArray.includes(item.id))
    return this
  }

  removeManyBy(predicate: (item: T) => boolean): Chain<T> {
    this.items = this.items.filter(item => !predicate(item))
    return this
  }

  removeManyByWhere(where: Partial<{ [K in keyof T]: T[K] }>): Chain<T> {
    this.items = this.items.filter(item => {
      return !Object.entries(where).every(([key, value]) => item[key as keyof T] === value)
    })
    return this
  }

  update(items: T | T[]): Chain<T> {
    const itemsArray = Array.isArray(items) ? items : [items]
    itemsArray.forEach(item => {
      const index = this.items.findIndex(i => i.id === item.id)
      if (index !== -1) {
        this.items[index] = item
      }
    })
    return this
  }

  updateById(ids: Id | Id[], newData: T): Chain<T> {
    const idArray = Array.isArray(ids) ? ids : [ids]
    idArray.forEach(id => {
      const index = this.items.findIndex(item => item.id === id)
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...newData }
      }
    })
    return this
  }

  updateManyBy(predicate: (item: T) => T): Chain<T> {
    this.items = this.items.map(item => predicate(item))
    return this
  }

  updateManyByWhere(where: Partial<{ [K in keyof T]: T[K] }>, newData: Partial<T>): Chain<T> {
    this.items = this.items.map(item => {
      const match = Object.entries(where).every(([key, value]) => item[key as keyof T] === value)
      if (match) {
        return { ...item, ...newData }
      }
      return item
    })
    return this
  }

  findById(id: Id): T | undefined {
    return this.items.find(item => item.id === id)
  }

  findBy(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate)
  }

  findManyBy(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate)
  }

  findManyByWhere(where: Partial<{ [K in keyof T]: T[K] }>): T[] {
    return this.items.filter(item => {
      return Object.entries(where).every(([key, value]) => item[key as keyof T] === value)
    })
  }

  has(item: T): boolean {
    return this.items.some(i => i.id === item.id)
  }

  hasById(id: Id): boolean {
    return this.items.some(item => item.id === id)
  }

  result(): T[] {
    return _.cloneDeep(this.items)
  }
}
