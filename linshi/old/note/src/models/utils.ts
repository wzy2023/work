export const transform = (arr: any[]) => {

  function addChildren(item: any) {
    const children = arr.filter((i: any) => i.parent === item.name)

    if (children.length) {
      item.children = children
      children.forEach((i: any) => addChildren(i))
    }

    return item
  }

  return arr.filter(i => !i.parent).map(addChildren)
}
