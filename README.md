# Project Libraries Overview

This document provides a detailed overview of the libraries in the `libs` directory of the project, including their features and usage instructions.

## Libraries

### @wzyjs/cli

A command-line interface tool that provides various utilities for development workflows.

#### Features and Usage

**Code Generation (`mi g`)**
- Generates models, APIs, and pages based on templates
- Usage: `mi g <type> <path> <cnName> <column>`
  - `type`: 1 (model only), 2 (model + API), 3 (model + API + page)
  - `path`: Path for the generated files (e.g., `/user`)
  - `cnName`: Chinese name for the entity
  - `column`: Column definitions in format `name:type,age:type`
- Example: `mi g 3 /user User name:varchar,age:tinyint,isMan:boolean=1`

**Commit Merging (`mi m`)**
- Utility for merging Git commits
- Options:
  - `--count`: Number of commits to merge (auto-calculated if not specified)
  - `--commit`: Whether to commit code before merging
  - `--push`: Whether to push code after merging
- Example: `mi m --count 3 --commit --push`

**Project Summary (`mi s`)**
- Generates a summary of the project's code
- Usage: `mi s`

### @wzyjs/hooks

A collection of React hooks that extend functionality from popular hooks libraries.

#### Features and Usage

**Third-party Hooks**
- Re-exports all hooks from `ahooks`
- Re-exports selected hooks from `react-use`:
  - `useCopyToClipboard`: Copy text to clipboard
  - `useCookie`: Manage browser cookies
  - `useUpdate`: Force component re-render

**Base Hooks**
- `useEffectValue`: Run effect and return its value
  ```tsx
  const value = useEffectValue(() => computeValue(), [dependency]);
  ```
- `useVisibleInfo`: Track visibility state with additional info
  ```tsx
  const { visible, setVisible, info, setInfo } = useVisibleInfo();
  ```
- `useClick`: Handle click events with debounce
  ```tsx
  const handleClick = useClick(() => { /* handler */ });
  ```
- `useDeepEffect`: Like useEffect but with deep comparison
  ```tsx
  useDeepEffect(() => { /* effect */ }, [deepDependency]);
  ```
- `useOnceEffect`: Run effect only once when dependencies change
  ```tsx
  useOnceEffect(() => { /* effect */ }, [dependency]);
  ```

**Ant Design Hooks**
- `useForm`: Enhanced Form.useForm with validation helpers
  ```tsx
  const [form, { validateFields, resetFields }] = useForm();
  ```
- `usePaginationState`: Manage pagination state
  ```tsx
  const [pagination, setPagination] = usePaginationState();
  ```
- `useHideFooter`: Hide modal footer based on conditions
  ```tsx
  const footerVisible = useHideFooter(condition);
  ```
- `useHovered`: Track hover state
  ```tsx
  const [ref, hovered] = useHovered();
  ```
- `useModalFooter`: Customize modal footer
  ```tsx
  const footer = useModalFooter({ okText: 'Submit', onOk });
  ```
- `useImperativeHandleForm`: Expose form methods via ref
  ```tsx
  useImperativeHandleForm(ref, form);
  ```
- `useDateRange`: Manage date range selection
  ```tsx
  const [dateRange, setDateRange] = useDateRange();
  ```
- `useOptions`: Manage select options
  ```tsx
  const options = useOptions(data);
  ```
- `useStep`: Manage multi-step processes
  ```tsx
  const { step, next, prev } = useStep();
  ```

**DOM Hooks**
- `useElementScrollVisible`: Detect when element is visible during scroll
  ```tsx
  const isVisible = useElementScrollVisible(ref);
  ```

**Other Hooks**
- `useCRUD`: Simplified CRUD operations
  ```tsx
  const { create, read, update, delete } = useCRUD(api);
  ```
- `useRequestPro`: Enhanced request hook with additional features
  ```tsx
  const { data, loading, run } = useRequestPro(fetchData);
  ```
- `useSetting`: Manage application settings
  ```tsx
  const [setting, setSetting] = useSetting('key', defaultValue);
  ```
- `useUserInfo`: Access current user information
  ```tsx
  const userInfo = useUserInfo();
  ```
- `useWechatLogin`: Handle WeChat login flow
  ```tsx
  const { login, loading } = useWechatLogin();
  ```

### @wzyjs/next

A library for Next.js applications with ZenStack integration.

#### Features and Usage

**Base ZenStack Model**
- Provides a base model with common fields:
  - `id`: String ID with CUID default
  - `createdAt`: Creation timestamp
  - `updatedAt`: Update timestamp
  - `isDeleted`: Soft delete flag
- Includes access rules (allows all operations when not deleted)
- Usage: Extend in your ZenStack models
  ```
  model User extends Base {
    name String
    email String @unique
  }
  ```

**ZenStack Plugin**
- Automatically generates React hooks for model CRUD operations
- Generated hooks follow naming pattern: `use{ModelName}Store`
- Features of generated hooks:
  - `create`: Create new records
  - `update`: Update existing records
  - `delete`: Delete records
  - `findMany`: Query multiple records
  - `findUnique`: Query a single record
- Usage:
  ```tsx
  const { data, create, update, remove } = useUserStore();
  ```

### @wzyjs/types

A collection of TypeScript type definitions for common use cases.

#### Features and Usage

**Utility Types**
- `Optional<T, K>`: Makes specific keys optional
  ```ts
  // Makes 'age' optional in User type
  type UserPartial = Optional<User, 'age'>;
  ```
- `Set<T, OmitK, OptionalK>`: Omits and makes keys optional
  ```ts
  // Omits 'id', makes 'age' optional
  type UserForm = Set<User, 'id', 'age'>;
  ```
- `KeyValue<D, V>`: Creates a record type
  ```ts
  // Creates a string-to-any map
  const settings: KeyValue<string, any> = {};
  ```

**Common Interface Types**
- `Option<V>`: For select/dropdown options
  ```ts
  const options: Option[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2', children: [] }
  ];
  ```
- `Pagination`: For pagination parameters
  ```ts
  const pagination: Pagination = { current: 1, pageSize: 10 };
  ```

### @wzyjs/utils

A comprehensive utility library with separate builds for browser and Node.js environments.

#### Features and Usage

**Browser Utilities**
- Download utilities: Save files from URLs or data
  ```ts
  import { downloadFile, downloadUrl } from '@wzyjs/utils';
  downloadUrl('https://example.com/file.pdf');
  ```
- Element utilities: DOM manipulation helpers
  ```ts
  import { getElementPosition } from '@wzyjs/utils';
  const position = getElementPosition(element);
  ```
- Style utilities: CSS manipulation
  ```ts
  import { addClassName } from '@wzyjs/utils';
  addClassName(element, 'active');
  ```

**Node.js Utilities**
- File operations: Enhanced file system utilities
  ```ts
  import { readJsonFile } from '@wzyjs/utils/node';
  const data = readJsonFile('config.json');
  ```
- Email sending: Simplified email utilities
  ```ts
  import { sendMail } from '@wzyjs/utils/node';
  await sendMail({ to, subject, text });
  ```
- OSS operations: Object storage utilities
  ```ts
  import { uploadToOSS } from '@wzyjs/utils/node';
  await uploadToOSS(file, 'path/to/destination');
  ```

**Common Utilities**
- Array utilities: Array manipulation functions
  ```ts
  import { arrayToTree } from '@wzyjs/utils';
  const tree = arrayToTree(flatArray, { id: 'id', pid: 'parentId' });
  ```
- Date utilities (using dayjs): Date formatting and manipulation
  ```ts
  import { formatDate } from '@wzyjs/utils';
  const formatted = formatDate(date, 'YYYY-MM-DD');
  ```
- Number utilities: Number formatting and calculation
  ```ts
  import { formatNumber, calculatePercentage } from '@wzyjs/utils';
  const formatted = formatNumber(1000, 2); // 1,000.00
  ```
- String utilities: String manipulation
  ```ts
  import { camelCase, truncate } from '@wzyjs/utils';
  const camelized = camelCase('hello-world'); // helloWorld
  ```
- Object utilities: Object manipulation
  ```ts
  import { deepMerge, pick } from '@wzyjs/utils';
  const merged = deepMerge(obj1, obj2);
  ```
- Promise utilities: Enhanced promise handling
  ```ts
  import { sleep, retry } from '@wzyjs/utils';
  await sleep(1000); // Wait 1 second
  ```

**AI Utilities**
- Integration with various AI services
  ```ts
  import { generateImage } from '@wzyjs/utils/node';
  const image = await generateImage(prompt);
  ```

## Usage

These libraries are designed to be used together in a monorepo setup, providing a comprehensive toolkit for building full-stack applications with React, Next.js, and related technologies.

To import and use these libraries:

```ts
// CLI is used via command line
// mi g 3 /user User name:varchar,age:tinyint

// Hooks
import { useForm, useRequest } from '@wzyjs/hooks';

// Next.js utilities
// (Used via ZenStack model definitions)

// Types
import { Optional, Option } from '@wzyjs/types';

// Utils
import { formatDate } from '@wzyjs/utils'; // Browser
import { readJsonFile } from '@wzyjs/utils/node'; // Node.js
```
