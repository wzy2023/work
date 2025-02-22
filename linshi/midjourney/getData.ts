import fs from 'fs-extra'
import { sendRequest } from './utils'

export const getData = async () => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
  const keyword = 'baby fashion show'
  const name = `./${keyword || 'random'}.json`

  let data: { [page: string]: any[] } = {}
  let allData: any[] = []

  try {
    const existingData = await fs.readFile(name, 'utf8')
    data = JSON.parse(existingData)
    allData = Object.values(data).flat()
  } catch (err) {
    data = {}
  }

  const existingSet = new Set(allData.map(item => item.id))

  for (const page of pages) {
    console.log(666, page + ' / ' + pages.length)

    const res: any = await sendRequest({
      // url: `https://www.midjourney.com/api/app/recent-jobs?amount=500&page=${page}&feed=random&_ql=explore`,
      url: `https://www.midjourney.com/api/app/vector-search?prompt=${encodeURIComponent(keyword)}&page=${page}&_ql=explore`,
      method: 'GET',
    })

    try {
      const jobs = JSON.parse(res)?.jobs || []

      // 过滤掉已经存在的重复数据
      const newJobs = jobs.filter((job: any) => !existingSet.has(job.id))

      if (!data[page]) {
        data[page] = []
      }

      // 确保每一页内部没有重复
      const uniqueNewJobs = newJobs.filter((job: any) =>
        !data[page].some(existingJob => existingJob.id === job.id),
      )

      data[page] = [...data[page], ...uniqueNewJobs]

      uniqueNewJobs.forEach((job: any) => existingSet.add(job.id))

      const jsonData = JSON.stringify(data, null, 2)
      await fs.writeFile(name, jsonData, 'utf8')

    } catch (err) {
      console.error(`处理第 ${page} 页时出错:`, err)
    }
  }

  console.log('数据已成功保存。')
}

// getData()
