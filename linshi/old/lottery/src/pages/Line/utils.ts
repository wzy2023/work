export type Type = 'cold' | 'moderate' | 'hot' | 'random' | 'total'

const getLine = (json: any[], hotIndex: number, type: Type, index: number, subType: 5 | 10, subIndex: 0 | 1 | 2) => {
  return json[hotIndex - 1]?.result.map((item: any) => {
    return {
      current: item.current,
      num: item.findResult[type][index]?.[subType][subIndex][2]?.toFixed(2),
    }
  })
}

export const createLines = (json: any[], hotIndex: number, type: Type, index: number, subType: 5 | 10) => ({
  line0: getLine(json, hotIndex, type, index, subType, 0),
  line1: getLine(json, hotIndex, type, index, subType, 1),
  line2: getLine(json, hotIndex, type, index, subType, 2),
})

export const createOption = (title: string, data: any, index: number, type: Type) => ({
  title: { text: title },
  tooltip: { trigger: 'axis' }, // 显示整列数据
  legend: {
    data: ['只算一个', '全部号码', '全部号码期数'],
    selected: {
      '只算一个': false, // 默认不显示“只算一个”系列
      '全部号码': true,  // 默认显示“全部算上”系列
      '全部号码期数': false,  // 默认显示“全部算上”系列
    },
  },
  xAxis: {
    type: 'category',
    data: data.line0.map((item: any) => item.current),
  },
  yAxis: {
    min: 0,
    max: type === 'total' ? Math.max(...data.line0.map((item: any) => item.num), ...data.line1.map((item: any) => item.num), ...data.line2.map((item: any) => item.num)) : index,
  },
  series: [
    {
      name: '只算一个',
      type: 'line',
      data: data.line0.map((item: any) => item.num),
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
    {
      name: '全部号码',
      type: 'line',
      data: data.line1.map((item: any) => item.num),
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
    {
      name: '全部号码期数',
      type: 'line',
      data: data.line2.map((item: any) => item.num),
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
  ],
})
