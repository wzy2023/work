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
- [ ] 展示信息数据表格
- [ ] 支持搜索信息标题
- [ ] 支持筛选是否启用状态
- [ ] 支持新建信息按钮
- [ ] 每行支持编辑与删除按钮

#### 新建信息页
- [ ] 提供表单输入标题、内容、key 和是否启用状态
- [ ] 提交按钮（校验 + 调用创建接口）
- [ ] 取消按钮（返回信息管理页）

#### 编辑信息页
- [ ] 页面加载时获取信息详情并填充表单
- [ ] 提交按钮（调用修改接口）
- [ ] 取消按钮（返回信息管理页）

#### 信息详情页
- [ ] 展示信息的标题、内容、key 和是否启用状态
- [ ] 创建时间、创建人、更新时间、更新人
