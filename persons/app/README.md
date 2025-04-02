# Persons App

## 技术栈

- **框架**: Next.js 15.x (App Router)
- **语言**: TypeScript
- **UI组件**: Ant Design 5.x
- **样式**: TailwindCSS + SASS
- **状态管理**: React Query
- **API层**: tRPC + ZenStack
- **数据库**: Prisma + ZenStack
- **工具链**: ESLint, Prettier
- **包管理**: bun

## 项目结构

```
persons/app/
├── src/
│   ├── app/          # Next.js App Router页面
│   ├── api/          # tRPC API定义
│   │   ├── react.ts  # 客户端API导出
│   │   └── server.ts # 服务端API导出
│   ├── components/   # 全局共享组件
│   │   └── index.ts  # 同时导出 @wzyjs/antd 和 @wzyjs/components
│   ├── hooks/        # 自定义Hooks
│   │   └── index.ts  # 同时导出 @wzyjs/hooks
│   ├── utils/        # 工具函数
│   │   └── index.ts  # 同时导出 @wzyjs/utils
│   ├── styles/       # 全局样式
│   ├── types/        # TypeScript类型定义
│   └── consts/       # 常量定义
├── prisma/
│   ├── schema.prisma # Prisma模型定义（由ZenStack生成）
│   └── models/       # ZModel数据模型定义
│       ├── TaskNode.zmodel
│       ├── TaskEdge.zmodel
│       └── HabitGroup.zmodel
│       └── HabitItem.zmodel
│       └── HabitRecord.zmodel
└── public/          # 静态资源
```

## 开发指南

### 个人习惯
#### 语法
使用es6及以上的语法
使用typescript的语法
使用解构赋值
使用扩展运算符
使用模板字符串
使用async/await，而不是回调函数

#### 变量
变量名应具有描述性，反映其用途
优先使用 const 声明变量，而不是 let
统一使用小驼峰命名法

#### 函数
使用箭头函数
使用 const 声明函数，而不是 function
函数名应具有描述性，反映其用途
每个函数只完成一个单一职责
使用默认参数值，减少条件判断
避免在循环中修改数组长度
保持变量作用域最小化
使用常量存储不变的值，避免魔法数字
使用高阶函数（如 map, filter）代替 for 循环

#### 其它
语句的末尾不使用分号 ; 结束
常量使用首大写字母和下划线（Snake_Case）
为复杂的逻辑块添加注释，应简明扼要，解释“为什么”而非“做什么”。
注释尽量使用 // 单行注释，

#### 代码组织
按功能模块组织代码目录结构
将组件、服务、工具函数、配置、常量、分开放置
将常量和配置放在单独的文件中
保持文件长度适中，避免过长文件
使用索引文件（index.ts）管理导出

#### 习惯
尽量将某个方向的功能抽成 react hooks
使用 on 开头命名事件处理程序函数，如 onClick、onChange
使用 is 开头命名布尔值函数，如 isValid
使用 get 开头命名返回值的函数，如 getUserName
使用 fetch 开头命名异步请求函数，如 fetchData
使用 render 开头命名渲染函数，如 renderTitle
使用 add、remove、create、delete、update 开头命名增删改查函数，如 addData
使用 format 开头命名格式化函数，如 formatTime
使用 check 开头命名校验函数，如 checkName

#### 框架及库
react
umijs
antd
lodash
ahooks

优先使用 ahooks 里的 hooks，例如：useBoolean 等。


### 2. ZenStack & Prisma Model 定义

本项目使用ZenStack框架，它提供了以下功能：

- 支持合并多个zmodel文件
- 自动生成model的增删改查tRPC API
- 自动生成Prisma schema

在`prisma/models`目录下定义数据模型：

```zmodel
// prisma/models/TaskNode.zmodel
import "@wzyjs/next/dist/Base"

model TaskNode {
  id        String    @id
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
  isDeleted Boolean?  @default(false) @omit
  
  type String
  data Json
  
  @@allow('all', !isDeleted)
}
```

### 3. tRPC API 开发

在`src/api/routers/**/*`目录下定义TRPC路由：
定义的路由需要在`src/api/routes/index.ts`中注册。

```typescript
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany()
  }),

  create: publicProcedure
  .input(z.object({
    name: z.string(),
    email: z.string().email(),
  }))
  .mutation(({ ctx, input }) => {
    return ctx.db.user.create({
      data: input,
    })
  }),
})
```

### 4. API 使用说明

在不同类型的组件中使用API：

```typescript
// 客户端组件中使用
import { api } from '@/api/react'

function ClientComponent() {
  const { data } = api.user.getAll.useQuery()
  return <div>{/* 使用数据 */ } < /div>
}

// 服务端组件中使用
import { api } from '@/api/server'

async function ServerComponent() {
  const users = await api.user.getAll.query()
  return <div>{/* 使用数据 */ } < /div>
}
```

### 5. 组件开发

在`src/components`中创建可复用组件。
该目录同时导出了`@wzyjs/antd`和`@wzyjs/components`的组件
使用antd的组件时可以直接从`@/components`导入

```tsx
// src/components/index.ts
export * from '@wzyjs/antd'
export * from '@wzyjs/components'
export * from './UserCard'  // 项目自身的组件

// src/components/UserCard.tsx
interface UserCardProps {
  name: string
  email: string
}

export const UserCard = ({ name, email }: UserCardProps) => {
  return (
    <div className = "p-4 border rounded-lg" >
      <h3>{ name } < /h3>
      < p > { email } < /p>
      < /div>
  )
}
```

### 6. Hooks使用

在`src/hooks`中定义自定义hooks。
该目录同时导出了`@wzyjs/hooks`的hooks：

```typescript
// src/hooks/index.ts
export * from '@wzyjs/hooks'
export * from './useUser'  // 项目自身的hooks

// src/hooks/useUser.ts
import { api } from '@/api/react'

export function useUser(id: string) {
  const { data, isLoading } = api.user.getById.useQuery(id)
  return { user: data, isLoading }
}
```

### 7. 工具函数

在`src/utils`中定义工具函数。
该目录同时导出了`@wzyjs/utils`的工具函数：

```typescript
// src/utils/index.ts
export * from '@wzyjs/utils'
export * from './format'  // 项目自身的工具函数

// src/utils/format.ts
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN').format(date)
}
```

## 注意事项

1. **数据库操作**

- 每次修改zmodel文件后需要运行 `npm run generate` 重新生成Prisma schema和API
- 使用 `npm run db:push` 同步数据库结构

2. **API开发**

- 所有API路由都需要在`src/api/routes/index.ts`中注册
- 使用zod进行输入验证
- 保持API命名一致性
- 注意区分客户端和服务端API的导入路径

3. **页面开发**

- 使用App Router的服务器组件优化性能
- 遵循Next.js的文件系统路由约定

4. **组件开发**

- 遵循组件命名规范
- 编写TypeScript类型定义
- 优先使用TailwindCSS进行样式开发，也可以在同目录创建index.module.scss文件使用SASS
- 可以直接使用@wzyjs系列组件库的组件

5. **代码质量**

- 遵循ESLint规则

## 常见问题

1. 如遇到类型错误，请确保运行了 `npm run generate`
2. 开发服务器启动失败，检查 `.env` 文件配置
3. 数据库连接问题，确认DATABASE_URL配置正确

## ZenStack 功能说明

ZenStack是一个全栈开发框架，基于Prisma，提供了以下核心功能：

1. **数据模型定义增强**
   - 支持多文件模型定义，可以将不同的模型分散到不同的.zmodel文件中
   - 支持模型间的引用和继承
   - 支持通过`@@allow`和`@@deny`定义访问控制规则
   - 支持通过`@omit`标记忽略字段
   - 支持通过`@default`定义默认值
   - 支持通过`@unique`定义唯一约束

2. **自动生成API**
   - 自动为每个模型生成CRUD的tRPC API
   - 支持自定义查询条件和排序
   - 支持关系查询和嵌套查询
   - 自动处理软删除（通过isDeleted字段）

3. **数据验证**
   - 自动生成Zod验证schema
   - 支持自定义验证规则

## 代理导出包说明

集成了 @wzyjs 系列的多个工具包：
@wzyjs/utils：包含 lodash、axios、dayjs 等工具函数
@wzyjs/components：提供了多个高级组件
@wzyjs/hooks：集成了 ahooks 和自定义 hooks
@wzyjs/antd：对 Ant Design 组件的增强封装

### @wzyjs/utils 工具函数
```javascript
export { default as _ } from 'lodash'
export { default as axios } from 'axios'
export { default as json5 } from 'json5'
export { default as consola } from 'consola'

export * from 'zod'

export { default as dayjs, Dayjs, Timezone } from './dayjs'
```

### @wzyjs/components 组件
```javascript
export * from './CodeView'
export * from './HtmlPro'
export * from './IframePro'
export * from './FormPro'
export * from './TablePro'
export * from './Com2Canvas'
export * from './Video'
export * from './MultiImageDisplay'
export * from './DownloadLink'
export * from './Fold'
export * from './DragSort'
export { default as ReactEchart } from 'echarts-for-react'
```

### @wzyjs/hooks 自定义Hooks
```javascript
export * from 'ahooks'

export { default as useUrlState } from '@ahooksjs/use-url-state'

export { useCopyToClipboard, useCookie, useUpdate } from 'react-use'

export * from './base/useEffectValue'
export * from './base/useVisibleInfo'
export * from './base/useClick'

export * from './antd/useForm'
export * from './antd/useHideFooter'
export * from './antd/useHovered'
export * from './antd/useModalFooter'
export * from './antd/useImperativeHandleForm'

export * from './dom/useElementScrollVisible'
```

### @wzyjs/antd 组件
该包是对Ant Design组件的二次封装，提供了以下增强组件：

```javascript
import '@ant-design/v5-patch-for-react-19'

export * from 'antd'

export * from '@ant-design/icons'

export { default as zh_CN } from 'antd/locale/zh_CN'

export {
  AntdRegistry,
} from '@ant-design/nextjs-registry'

export {
  PageLoading,
  PageHeader,

  ProCard,
  ProList,

  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormUploadButton,
  LoginForm,
  BetaSchemaForm,

  CheckCard,
  EditableProTable,
} from '@ant-design/pro-components'

export { ProLayoutProps, ProFormInstance } from '@ant-design/pro-components'

export * from './pro'
export * from './form'

```
