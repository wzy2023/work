import React from 'react'
import { Row, Col, Image } from 'antd'

export const MultiImageDisplay = ({ images = [], preview = false }) => {
  const renderImages = () => {
    const count = images.length

    if (count === 1) {
      return (
        <Image src={images[0]} preview={preview} style={{ width: '100%', height: 'auto' }} />
      )
    }

    if (count === 2) {
      return (
        <Row gutter={8}>
          {images.map((img, index) => (
            <Col span={12} key={index}>
              <Image src={img} preview={preview} style={{ width: '100%', height: 'auto' }} />
            </Col>
          ))}
        </Row>
      )
    }

    if (count === 3) {
      return (
        <div>
          <Row gutter={8}>
            {images.slice(0, 2).map((img, index) => (
              <Col span={12} key={index}>
                <Image src={img} preview={preview} style={{ width: '100%', height: 'auto' }} />
              </Col>
            ))}
          </Row>
          <Row gutter={8} style={{ marginTop: '8px' }}>
            <Col span={24}>
              <Image src={images[2]} preview={preview} style={{ width: '100%', height: 'auto' }} />
            </Col>
          </Row>
        </div>
      )
    }

    if (count >= 4) {
      return (
        <Row>
          {images.map((img, index) => (
            <Col span={12} key={index}>
              <Image src={img} preview={preview} style={{ width: '100%', height: 'auto' }} />
            </Col>
          ))}
        </Row>
      )
    }

    return null
  }

  return <div>{renderImages()}</div>
}
