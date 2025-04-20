// @ts-nocheck
import { Button } from 'antd'

export default () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)',
    },
    hero: {
      flex: 50,
      background: '#f5f6f8',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      title: {
        fontSize: 48,
        fontWeight: 600,
        marginBottom: 16,
      },
      description: {
        color: '#454d64',
        lineHeight: 1.6,
        fontSize: 16,
        marginBottom: 32,
      },
      button: {
        width: 130,
      },
    },
    features: {
      flex: 50,
      padding: '0 20%',
      display: 'flex',
      justifyContent: 'space-between',
      background: '#fff',
      item: {
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        img: {
          width: 60,
          marginBottom: 15,
        },
        title: {
          fontSize: 20,
          marginBottom: 12,
        },
        description: {
          color: '#454d64',
        },
      },
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.hero.center}>
          <h1 style={styles.hero.title}>New Blog</h1>
          <p style={styles.hero.description}>前端界的一名小学生~</p>
          <Button
            style={styles.hero.button}
            shape='round'
            type='primary'
            size='large'
            href='/#/1.Html/1.标签介绍'
          >
            开始学习
          </Button>
        </div>
      </div>
      <div style={styles.features}>
        <div style={styles.features.item}>
          <img style={styles.features.item.img} src='//gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png' />
          <p style={styles.features.item.title}>深挖前端基础</p>
          <p style={styles.features.item.description}>Hello</p>
        </div>
        <div style={styles.features.item}>
          <img style={styles.features.item.img} src='//gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png' />
          <p style={styles.features.item.title}>拓展知识边界</p>
          <p style={styles.features.item.description}>Word</p>
        </div>
        <div style={styles.features.item}>
          <img style={styles.features.item.img} src='//gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png' />
          <p style={styles.features.item.title}>记录所思所想</p>
          <p style={styles.features.item.description}>!</p>
        </div>
      </div>
    </div>
  )
}
