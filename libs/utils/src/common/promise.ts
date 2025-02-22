// 计算执行 promise 花费的时间
export const executePromise = async (promise: Promise<any>) => {
  const start = Date.now()
  const result = await promise
  const time = Date.now() - start
  return {
    result,
    time,
  }
}

// 执行 Promise 并在 reject 时重试
export const retryPromise = async (promiseFn: () => Promise<any>, retryInterval = 1000, retryCount = 3): Promise<any> => {
  try {
    return await promiseFn()
  } catch (error) {
    if (retryCount <= 0) {
      throw error // 最后一次重试后仍然失败，抛出拒绝原因
    }
    await new Promise(resolve => setTimeout(resolve, retryInterval))
    return retryPromise(promiseFn, retryCount - 1, retryInterval)
  }
}
