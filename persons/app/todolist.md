我想在 person/app 下创建个 信息管理 的新页面

字段：标题、内容、key、是否启用

### 数据库
- [x] 标题（字符串，必填）
- [x] 内容（文本，可选）
- [x] key（字符串，唯一，必填）
- [x] 是否启用（布尔）

### 执行结果和记录

#### 创建的文件
1. **persons/app/prisma/models/InfoItem.zmodel**
```zmodel
import "@wzyjs/next/dist/Base"

model InfoItem extends Base {
  title String
  content String?
  isEnabled Boolean @default(true)
}
```

2. **persons/app/src/api/types/info.ts**
```typescript
import type { InfoItem } from '@prisma/client'

declare global {
  export namespace Info {
    export type Item = InfoItem
  }
}
```

#### 更新的文件
1. **persons/app/prisma/schema.zmodel** - 添加了 InfoItem 模型的导入
2. **persons/app/src/api/types/index.ts** - 添加了 info 类型导出

#### 执行命令
```bash
bun run generate
```

生成了 Prisma Client 和 tRPC 接口。

### 后端接口
- [x] 获取信息列表：分页获取信息数据，支持筛选是否启用
- [x] 创建信息：录入新信息的标题、内容、key 和是否启用状态
- [x] 修改信息：支持修改标题、内容、key 和是否启用状态
- [x] 删除信息：逻辑删除信息数据

### 前端页面
#### 信息管理页
- [x] 展示信息数据表格
- [x] 支持搜索信息标题
- [x] 支持筛选是否启用状态
- [x] 支持新建信息按钮
- [x] 每行支持编辑与删除按钮

#### 新建信息页
- [x] 提供表单输入标题、内容、key 和是否启用状态
- [x] 提交按钮（校验 + 调用创建接口）
- [x] 取消按钮（返回信息管理页）

#### 编辑信息页
- [x] 页面加载时获取信息详情并填充表单
- [x] 提交按钮（调用修改接口）
- [x] 取消按钮（返回信息管理页）

#### 信息详情页
- [x] 展示信息的标题、内容、key 和是否启用状态
- [x] 创建时间、创建人、更新时间、更新人

### 执行结果和记录

#### 创建的前端文件
1. **persons/app/src/app/info/page.tsx** - 信息管理主页面
2. **persons/app/src/app/info/store.ts** - 信息管理状态存储
3. **persons/app/src/app/info/components/InfoList.tsx** - 信息列表组件
4. **persons/app/src/app/info/components/CreateUpdate.tsx** - 信息创建/编辑组件
5. **persons/app/src/app/info/components/Delete.tsx** - 信息删除组件

#### 更新的文件
1. **persons/app/src/components/SideMenu/index.tsx** - 添加了信息管理菜单项

#### 实现功能
1. 信息表格展示，包含ID、标题、内容、Key、状态、创建时间等列
2. 支持信息标题搜索
3. 支持通过状态（启用/禁用）筛选信息
4. 提供新建信息弹窗，包含标题、内容、Key、状态等表单项
5. 提供编辑信息功能，自动填充表单
6. 提供删除信息功能，并有确认提示
7. 支持直接在表格中切换信息启用状态
