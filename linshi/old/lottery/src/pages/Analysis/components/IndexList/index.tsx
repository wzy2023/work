import { Space, Tag } from '@/components'
import { useDebounce } from '@/hooks'
import { roundToDecimalPlaces } from '../../utils'

const getColor = (index: number, num: number, maxNum: number, type: 'prev' | 'next'): string => {
  // 确保 index 在 0 和 maxNum 之间
  const clampedNum = Math.max(0, Math.min(index, maxNum))

  if (type === 'prev') {
    // 计算红色和蓝色分量
    // 当 index 是 0 时，红色分量是最大的，蓝色分量是最小的
    // 当 index 是 maxNum 时，红色分量是最小的，蓝色分量是最大的
    const red = 255 * (1 - clampedNum / maxNum)
    const blue = 255 * (clampedNum / maxNum)

    // 返回 rgb 格式的颜色
    return `rgb(${Math.round(red)}, 0, ${Math.round(blue)})`
  }

  if (type === 'next') {
    // 计算红色和绿色分量
    // 当 index 是 0 时，绿色分量是最大的，蓝色分量是最小的
    // 当 index 是 maxNum 时，绿色分量是最小的，蓝色分量是最大的
    const green = 255 * (1 - clampedNum / num)
    const blue = 255 * (clampedNum / num)
    return `rgb(0, ${Math.round(green)}, ${Math.round(blue)})`
  }

  return ''
}

export const IndexList = (props: any) => {
  const { type, showIndexNum, calcIndexNum, showTag = true, indexs, num, hots } = props

  const showIndexNumDebounce = useDebounce(showIndexNum)

  const fix = type === 'prev' ? '-' : '+'
  const indexs_ = type === 'prev' ? indexs.slice(0, showIndexNumDebounce).reverse() : indexs.slice(0, showIndexNumDebounce)

  return (
    <Space
      size='small'
      style={{
        zoom: 1,
        minWidth: 500,
        display: 'flex',
        justifyContent: type === 'prev' ? 'flex-end' : 'flex-start',
      }}
    >
      {indexs_.map((item: any, i: number) => {
        const index = item.indexDifference
        const color = getColor(Math.abs(index), num, num, type)
        return (
          <div key={i}>
            <Tag
              color={color}
              style={{
                marginRight: 0,
                width: 45,
                textAlign: 'center',
                visibility: showTag ? 'visible' : 'hidden',
              }}
            >
              {fix}{index}
            </Tag>
            <div style={{ fontSize: 10, whiteSpace: 'pre', textAlign: 'center' }}>
              {type === 'prev' ? (
                <>
                  <div>{roundToDecimalPlaces(hots?.current?.[indexs_.length - i - 1]?.h)}</div>
                  <div style={{ color: indexs_.length - calcIndexNum === i ? 'green' : '' }}>
                    {roundToDecimalPlaces(hots?.slice?.[indexs_.length - i - 1]?.h)}
                  </div>
                </>
              ) || ' ' : item.nums}
            </div>
          </div>
        )
      })}
    </Space>
  )
}
