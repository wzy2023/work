export const readClipboard = async () => {
  try {
    return await navigator.clipboard.readText();
  } catch (error) {
    return ''
  }
}
