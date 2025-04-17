export const readClipboard = async () => {
  try {
    return await navigator.clipboard.readText();
  } catch (error) {
    return ''
  }
}

export const printConsoleLog = (type: string, path: string, params: any, response: any) => {
  const styles = {
    header: 'color: #fff; background: #35495e; padding: 2px 8px; border-radius: 3px 0 0 3px;',
    value: 'color: #35495e; background: #f0f4f8; padding: 2px 6px; border-radius: 0 3px 3px 0;',
    separator: 'color: #409EFF; margin: 0 4px;',
  }
  console.groupCollapsed(`666 %c${type}%c${path}`, styles.header, styles.value)
  if (params) {
    // console.table(params)
  }
  if (response) {
    // console.table(response)
  }
  console.groupEnd()
}
