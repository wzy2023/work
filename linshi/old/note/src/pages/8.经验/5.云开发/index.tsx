import { AlertPro, AnchorCard, Space, ParamsTable, TabsPro } from '@/components'

export default (): React.ReactNode => [
  <AnchorCard title='项目的部署方式'>
    <ParamsTable
      data={[
        { label: '类型', desc: '部署方式' },
        { label: '前端项目', desc: '1. 腾讯云-Web应用托管\n2. Gitee-Pages' },
        { label: '后端项目', desc: '腾讯云-CloudBase' },
        { label: '一体化项目', desc: '腾讯云-CloudBase' },
        { label: 'Serverless项目', desc: '腾讯云-CloudBase' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='项目迭代中的4个阶段'>
    <AlertPro>
      <div>1. 编写代码、commit、push</div>
      <div>2. Build 构建</div>
      <div>3. Deploy 部署 (多版本)</div>
      <div style={{ marginLeft: 10 }}> 3.1 回滚</div>
      <div style={{ marginLeft: 10 }}> 3.2 灰度</div>
      <div>4. 日志、监控</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='我理解的云开发'>
    <div>云开发应该是 CI/CD + ServerLess + 接口中台 + 数据中台 + [低代码搭建]</div>
    <div>能帮我们在项目迭代中，实现一些自动化、流程化、和基础能力方面的东西</div>
  </AnchorCard>,
  <AnchorCard title='我需要的云开发平台'>
    <div>略</div>
  </AnchorCard>,
  <AnchorCard title='各云开发平台'>
    <TabsPro
      items={[
        {
          label: '腾讯云',
          children: [
            <TabsPro
              items={[
                {
                  label: 'Web 应用托管', children: [
                    <Space direction='vertical'>
                      <div>
                        <div>自动化部署前端项目，包括静态页面项目、React之类开发的项目</div>
                        <div>主要支持开发三个阶段中的[构建]和[部署]</div>
                      </div>
                      <div>
                        <b>它的原理：</b>
                        <div style={{ marginLeft: 10 }}>接受 github 仓库的 push hook 是平台自有能力</div>
                        <div style={{ marginLeft: 10 }}>构建打包是平台自有能力</div>
                        <div style={{ marginLeft: 10 }}>部署则是调用了CloudBase的页面托管能力</div>
                      </div>
                      <div>
                        <b>优点是：</b>
                        <div style={{ marginLeft: 10 }}>代码库有新push后，会自动打包并部署</div>
                        <div style={{ marginLeft: 10 }}>有默认域名和HTTPS</div>
                      </div>
                      <div>
                        <b>缺点是：</b>
                        <div style={{ marginLeft: 10 }}>部署的产物，不支持版本、不支持回滚、灰度</div>
                        <div style={{ marginLeft: 10 }}>不支持后端项目</div>
                      </div>
                    </Space>,
                  ],
                },
                {
                  label: 'CloudBase', children: [
                    <Space direction='vertical'>
                      <div>
                        <div>构建</div>
                        <div style={{ marginLeft: 10 }}>不支持</div>
                      </div>
                      <div>
                        <div>部署</div>
                        <div style={{ marginLeft: 10 }}>前端</div>
                        <div style={{ marginLeft: 10 }}>多项目 (二级目录)、单版本</div>
                        <div style={{ marginLeft: 10 }}>后端</div>
                        <div style={{ marginLeft: 10 }}>多项目、多版本、灰度、回滚</div>
                      </div>
                      <div>
                        <div>基础能力</div>
                        <div style={{ marginLeft: 10 }}>开发中</div>
                        <div style={{ marginLeft: 10 }}>登录授权、用户管理</div>
                        <div style={{ marginLeft: 10 }}>数据库</div>
                        <div style={{ marginLeft: 10 }}>云存储</div>
                        <div style={{ marginLeft: 10 }}>云函数</div>
                        <div style={{ marginLeft: 10 }}>运维中</div>
                        <div style={{ marginLeft: 10 }}>监控报警</div>
                        <div style={{ marginLeft: 10 }}>日志</div>
                      </div>
                      <div>
                        <div>扩展能力</div>
                        <div style={{ marginLeft: 10 }}>Redis</div>
                        <div style={{ marginLeft: 10 }}>Mysql</div>
                        <div style={{ marginLeft: 10 }}>图像处理</div>
                        <div style={{ marginLeft: 10 }}>图像盲水印</div>
                        <div style={{ marginLeft: 10 }}>图像安全审核</div>
                        <div style={{ marginLeft: 10 }}>图像标签</div>
                      </div>
                      <div>
                        <div>其它</div>
                        <div style={{ marginLeft: 10 }}>内容 Api 管理平台</div>
                        <div style={{ marginLeft: 10 }}>Redis</div>
                      </div>
                    </Space>,
                  ],
                },
                {
                  label: 'ServerLess 应用中心', children: [
                    <div>没用明白，不太好用</div>,
                  ],
                },
              ]}
            />,
          ],
        },
        {
          label: '阿里云',
          children: [
            <TabsPro
              items={[
                {
                  label: '云效',
                  children: [
                    <Space direction='vertical'>
                      <div>感觉更适合公司团队使用，不是ServerLess的那种方案</div>
                      <div>项目管理</div>
                      <div>代码管理</div>
                      <div>文档管理</div>
                      <div>制品管理</div>
                      <div>流水线</div>
                      <div style={{ marginLeft: 10 }}>不知道怎么上传CDN & CDN需要单独购买</div>
                      <div style={{ marginLeft: 10 }}>不知道怎么上传容器 & 容器需要单独购买 & 容器不会自动扩容</div>
                      <div style={{ marginLeft: 10 }}>不知道怎么回滚</div>
                      <div style={{ marginLeft: 10 }}>不知道怎么自动触发流水线</div>

                      <b>优势</b>
                      <div>大而全</div>
                      <div>各功能间可以联动</div>

                      <b>劣势</b>
                      <div>需要花费资金去买资源</div>
                      <div style={{ marginLeft: 10 }}>按量付费是按时间付费</div>
                      <div>没有提供用户登录的那些api</div>
                    </Space>,
                  ],
                },
                {
                  label: 'ServerLess SAE',
                  children: [
                    <div>没用明白，不太好用</div>,
                  ],
                },
                {
                  label: '小程序云',
                  children: [
                    <div>没用明白，不太好用</div>,
                  ],
                },
                {
                  label: '移动研发平台 EMAS',
                  children: [
                    <div>没用明白，不太好用</div>,
                  ],
                },
              ]}
            />,
          ],
        },
      ]}
    />
  </AnchorCard>,
]
