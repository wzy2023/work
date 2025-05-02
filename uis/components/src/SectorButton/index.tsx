'use client'

import React, { useState } from 'react'

export interface SectorButtonSector<T> {
  id: T;
  label?: string;
  color?: string;
  hoverColor?: string;
}

export interface SectorButtonProps<T> {
  sectors: SectorButtonSector<T>[];
  size?: number;
  className?: string;
  onClick?: (id: T) => void;
  borderRadius?: number;
  showPlusSign?: boolean;
  plusSignColor?: string;
  plusSignSize?: number;
  shape?: 'circle' | 'rounded-rect';
  rectWidth?: number;
  rectHeight?: number;
}

export const SectorButton = <T = string>(props: SectorButtonProps<T>) => {
  const {
    shape = 'rounded-rect',
    size = 40,
    rectWidth = size,
    rectHeight = size,
    sectors,
    className,
    borderRadius = 12,
    showPlusSign = true,
    plusSignColor = '#bbb',
    plusSignSize = 0.3,
    onClick,
  } = props

  const [hoveredSector, setHoveredSector] = useState<T | null>(null)

  const anglePerSector = 360 / sectors.length
  const radius = size / 2

  // 添加额外边距确保虚线显示完整
  const padding = 2
  const svgWidth = shape === 'circle' ? size + padding * 2 : rectWidth + padding * 2
  const svgHeight = shape === 'circle' ? size + padding * 2 : rectHeight + padding * 2

  const handleSectorClick = (id: T) => {
    onClick?.(id)
  }

  // 先渲染非悬停的扇形，然后渲染悬停的扇形，确保悬停的扇形在最顶层
  const nonHoveredSectors = sectors.filter(sector => sector.id !== hoveredSector)
  const hoveredSector1 = sectors.find(sector => sector.id === hoveredSector)
  const orderedSectors = [...nonHoveredSectors]
  if (hoveredSector1) {
    orderedSectors.push(hoveredSector1)
  }

  // 生成圆角矩形或扇形的路径
  const generatePath = (sector: SectorButtonSector<T>, originalIndex: number) => {
    const centerX = svgWidth / 2
    const centerY = svgHeight / 2

    if (shape === 'circle') {
      // 原来的扇形路径生成逻辑
      const startAngle = originalIndex * anglePerSector
      const endAngle = (originalIndex + 1) * anglePerSector

      const startRad = (startAngle - 90) * Math.PI / 180
      const endRad = (endAngle - 90) * Math.PI / 180

      return [
        `M ${centerX} ${centerY}`,
        `L ${centerX + radius * Math.cos(startRad)} ${centerY + radius * Math.sin(startRad)}`,
        `A ${radius} ${radius} 0 ${anglePerSector > 180 ? 1 : 0} 1 ${centerX + radius * Math.cos(endRad)} ${centerY + radius * Math.sin(endRad)}`,
        `Z`,
      ].join(' ')
    } else {
      // 圆角矩形的分块逻辑
      const rectX = padding
      const rectY = padding
      const rectW = rectWidth
      const rectH = rectHeight

      // 当只有2个扇形时，使用左右布局
      if (sectors.length === 2) {
        const secWidth = rectW / 2
        const secHeight = rectH
        const x = rectX + originalIndex * secWidth
        const y = rectY

        // 使用圆角矩形绘制单个部分
        const br = borderRadius > 0 ? Math.min(borderRadius, secWidth / 4, secHeight / 4) : 0

        // 确定是左侧还是右侧
        const isLeft = originalIndex === 0
        const isRight = originalIndex === 1

        // 构建路径 - 根据位置决定哪些角有圆角
        return [
          `M ${x + (isLeft ? br : 0)} ${y}`,

          // 上边
          `H ${x + secWidth - (isRight ? br : 0)}`,
          isRight ? `A ${br} ${br} 0 0 1 ${x + secWidth} ${y + br}` : '',

          // 右边
          `V ${y + secHeight - (isRight ? br : 0)}`,
          isRight ? `A ${br} ${br} 0 0 1 ${x + secWidth - br} ${y + secHeight}` : '',

          // 下边
          `H ${x + (isLeft ? br : 0)}`,
          isLeft ? `A ${br} ${br} 0 0 1 ${x} ${y + secHeight - br}` : '',

          // 左边
          `V ${y + (isLeft ? br : 0)}`,
          isLeft ? `A ${br} ${br} 0 0 1 ${x + br} ${y}` : '',

          'Z',
        ].filter(Boolean).join(' ')
      } else {
        // 原有的上下布局逻辑
        const secWidth = rectW / (sectors.length % 2 === 0 ? sectors.length / 2 : Math.ceil(sectors.length / 2))
        const secHeight = rectH / 2

        // 确定当前扇区在矩形中的位置
        const isTopRow = originalIndex < Math.ceil(sectors.length / 2)
        const rowIndex = isTopRow ? originalIndex : originalIndex - Math.ceil(sectors.length / 2)

        const x = rectX + rowIndex * secWidth
        const y = isTopRow ? rectY : rectY + secHeight

        // 使用圆角矩形绘制单个部分
        const br = borderRadius > 0 ? Math.min(borderRadius, secWidth / 4, secHeight / 4) : 0

        // 确定哪些边需要圆角
        const isLeftEdge = (isTopRow && rowIndex === 0) || (!isTopRow && rowIndex === 0)
        const isRightEdge = (isTopRow && rowIndex === Math.ceil(sectors.length / 2) - 1) ||
          (!isTopRow && rowIndex === (sectors.length - Math.ceil(sectors.length / 2)) - 1)
        const isTopEdge = isTopRow
        const isBottomEdge = !isTopRow

        // 构建路径 - 根据位置决定哪些角有圆角
        return [
          `M ${x + (isLeftEdge && isTopEdge ? br : 0)} ${y}`,

          // 上边
          `H ${x + secWidth - (isRightEdge && isTopEdge ? br : 0)}`,
          isRightEdge && isTopEdge ? `A ${br} ${br} 0 0 1 ${x + secWidth} ${y + br}` : '',

          // 右边
          `V ${y + secHeight - (isRightEdge && isBottomEdge ? br : 0)}`,
          isRightEdge && isBottomEdge ? `A ${br} ${br} 0 0 1 ${x + secWidth - br} ${y + secHeight}` : '',

          // 下边
          `H ${x + (isLeftEdge && isBottomEdge ? br : 0)}`,
          isLeftEdge && isBottomEdge ? `A ${br} ${br} 0 0 1 ${x} ${y + secHeight - br}` : '',

          // 左边
          `V ${y + (isLeftEdge && isTopEdge ? br : 0)}`,
          isLeftEdge && isTopEdge ? `A ${br} ${br} 0 0 1 ${x + br} ${y}` : '',

          'Z',
        ].filter(Boolean).join(' ')
      }
    }
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: shape === 'circle' ? size : rectWidth,
        height: shape === 'circle' ? size : rectHeight,
        borderRadius,
        backgroundColor: 'transparent',
      }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{
          position: 'absolute',
          top: -padding,
          left: -padding,
        }}
      >
        <g>
          {orderedSectors.map(sector => {
            const originalIndex = sectors.findIndex(s => s.id === sector.id)
            const pathData = generatePath(sector, originalIndex)

            const isHovered = hoveredSector === sector.id
            const fillColor = (isHovered ? sector.hoverColor : sector.color) || 'white'
            const strokeColor = isHovered ? '#90cdf4' : '#e2e8f0'
            const strokeWidth = isHovered ? 1.5 : 1

            return (
              <g key={sector.id as string}>
                <path
                  d={pathData}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray='4,1'
                  className='transition-colors duration-200 cursor-pointer'
                  onMouseEnter={() => setHoveredSector(sector.id)}
                  onMouseLeave={() => setHoveredSector(null)}
                  onClick={() => handleSectorClick(sector.id)}
                />
              </g>
            )
          })}

          {/* 在中间添加加号 */}
          {showPlusSign && (
            <g>
              <line
                x1={svgWidth / 2 - (plusSignSize * (shape === 'circle' ? size : Math.min(rectWidth, rectHeight)) / 2)}
                y1={svgHeight / 2}
                x2={svgWidth / 2 + (plusSignSize * (shape === 'circle' ? size : Math.min(rectWidth, rectHeight)) / 2)}
                y2={svgHeight / 2}
                stroke={plusSignColor}
                strokeWidth={2}
                strokeLinecap='round'
              />
              <line
                x1={svgWidth / 2}
                y1={svgHeight / 2 - (plusSignSize * (shape === 'circle' ? size : Math.min(rectWidth, rectHeight)) / 2)}
                x2={svgWidth / 2}
                y2={svgHeight / 2 + (plusSignSize * (shape === 'circle' ? size : Math.min(rectWidth, rectHeight)) / 2)}
                stroke={plusSignColor}
                strokeWidth={2}
                strokeLinecap='round'
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  )
}
