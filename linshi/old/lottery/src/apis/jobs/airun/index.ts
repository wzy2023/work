// import { LotteryAsalysisPossibilitiesIndexs } from '@/apis/entities'
// import fs from 'fs'
//
// async saveDataJson() {
//   const page = 30
//   const pageSize = 10000
//   const filePath = './data.json'
//
//   for (let i = 1; i <= page; i++) {
//     console.time()
//     const res = await LotteryAsalysisPossibilitiesIndexs.find({
//       select: ['prevIndexs', 'nextIndexs'],
//       take: pageSize,
//       skip: pageSize * (i - 1),
//     })
//
//     const json = res.map(item => ({
//       prev: item.prevIndexs.map(i => i.indexDifference).slice(-30),
//       next: item.nextIndexs[0].indexDifference,
//     })).filter(i => i.prev.length === 30)
//
//     let jsonSource: any = []
//     if (i !== 1) {
//       jsonSource = JSON.parse(fs.readFileSync(filePath, 'utf8'))
//     }
//     fs.writeFile('./data.json', JSON.stringify([...jsonSource, ...json]), () => undefined)
//     console.log(666, i, json[0].next, jsonSource.length + json.length)
//     console.timeEnd()
//   }
// }
