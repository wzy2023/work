import { Button, Typography, Space, Divider } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import './App.css';

// 添加chrome类型引用
declare const chrome: {
  runtime: {
    openOptionsPage: () => void
  },
  tabs: {
    query: (queryInfo: { active: boolean, currentWindow: boolean }) => Promise<{ id?: number }[]>,
    sendMessage: (tabId: number, message: any) => void
  }
}

const { Title, Paragraph } = Typography

function App() {
  // 在当前页面打开抽屉
  const showContentDrawer = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { action: 'showDrawer' })
    }
  }

  return (
    <Space direction='vertical' style={{ width: '100%', padding: '16px' }}>
      <Title level={3} style={{ textAlign: 'center', margin: '8px 0' }}>
        网页内容查看器
      </Title>

      <Divider style={{ margin: '12px 0' }} />

      <Paragraph style={{ textAlign: 'center' }}>
        浏览器扩展：在网页上显示内容查看按钮
      </Paragraph>

      <Button
        type='primary'
        icon={<EyeOutlined />}
        onClick={showContentDrawer}
        block
      >
        查看当前页面内容
      </Button>
    </Space>
  );
}

export default App;
