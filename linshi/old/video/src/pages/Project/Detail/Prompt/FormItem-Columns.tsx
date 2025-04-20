import React, { useEffect } from 'react'
import { Button, Select, Input, EditableProTable, DeleteOutlined } from '@wzyjs/component-web'

const { Option } = Select

// 定义数据源的类型
interface DataSourceItem {
  key: string;
  dataIndex: string;
  valueType: 'input' | 'textarea' | 'radio' | 'checkbox' | 'select';
  options: string[];
  initialValue: string | string[]; // 初始值字段
  isEditing?: boolean; // 标识行是否处于编辑模式
}

// 定义组件的属性类型
interface ColumnsFormItemProps {
  value?: DataSourceItem[];
  onChange?: (dataSource: DataSourceItem[]) => void;
  defaultDataIndexs?: string[]; // 可选参数，用于设置初始 dataIndex
}

export const ColumnsFormItem: React.FC<ColumnsFormItemProps> = (props) => {
  const { value = [], onChange, defaultDataIndexs = [] } = props

  // 初始化时设置默认的 dataIndex
  useEffect(() => {
    if (defaultDataIndexs.length > 0 && value?.length === 0) {
      const initialData = defaultDataIndexs.map((dataIndex, index) => ({
        key: `${Date.now()}-${index}`,
        dataIndex,
        valueType: 'textarea',
        options: [],
        initialValue: '',
        isEditing: true,
      }))
      onChange && onChange(initialData)
    }
  }, [value, defaultDataIndexs, onChange])

  const handleValueChange = (key: string, field: keyof DataSourceItem, newValue: any) => {
    const newData = value.map(item => {
      if (item.key === key) {
        return {
          ...item,
          [field]: newValue,
        }
      }
      return item
    })

    onChange?.(newData)
  }

  const handleAddRow = () => {
    // 如果有 defaultDataIndexs，则从中选择未使用的 dataIndex
    const usedDataIndexs = value.map(item => item.dataIndex)
    const availableDataIndexs = defaultDataIndexs.filter(di => !usedDataIndexs.includes(di))

    let newDataIndex: string
    if (availableDataIndexs.length > 0) {
      newDataIndex = availableDataIndexs[0]
    } else {
      newDataIndex = ''
    }

    const newKey = `${Date.now()}`
    const newItem: DataSourceItem = {
      key: newKey,
      dataIndex: newDataIndex,
      valueType: 'textarea',
      options: [],
      initialValue: '',
      isEditing: true,
    }
    onChange && onChange([...value, newItem])
  }

  const handleRemoveRow = (key: string) => {
    const newData = value.filter((item) => item.key !== key)
    onChange && onChange(newData)
  }

  const handlevalueTypeChange = (val: DataSourceItem['valueType'], record: DataSourceItem) => {
    const newRecord = {
      ...record,
      valueType: val,
      options: val === 'input' || val === 'textarea' ? [] : record.options, // 修改这里
      initialValue: val === 'input' || val === 'textarea' ? '' : [],
    }

    const newData = value.map((item) =>
      item.key === record.key ? newRecord : item,
    )
    onChange && onChange(newData)
  }

  const handleOptionsChange = (val: string[], record: DataSourceItem) => {
    handleValueChange(record.key, 'options', val)
  }

  const handleInitialValueChange = (val: string | string[], record: DataSourceItem) => {
    handleValueChange(record.key, 'initialValue', val)
  }

  const handleEditRow = (key: string) => {
    const newData = value.map(item =>
      item.key === key ? { ...item, isEditing: !item.isEditing } : item,
    )
    onChange && onChange(newData)
  }

  const renderOptions = (record: DataSourceItem) => {
    if (record.valueType === 'input' || record.valueType === 'textarea') {
      return null // 不渲染 Options 列
    }

    if (record.isEditing) {
      return (
        <Select
          mode='tags'
          value={record.options}
          onChange={(val) => handleOptionsChange(val, record)}
          style={{ width: '100%' }}
        >
          {(Array.isArray(record.options) ? record.options : []).map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      )
    } else {
      return record.options.join(', ') || ''
    }
  }

  const renderInitialValue = (record: DataSourceItem) => {
    if (record.isEditing) {
      if (record.valueType === 'input') {
        return (
          <Input
            value={record.initialValue as string}
            onChange={(e) => handleInitialValueChange(e.target.value, record)}
          />
        )
      } else if (record.valueType === 'textarea') {
        return (
          <Input.TextArea
            value={record.initialValue as string}
            onChange={(e) => handleInitialValueChange(e.target.value, record)}
          />
        )
      } else {
        return (
          <Select
            mode={record.valueType === 'checkbox' ? 'multiple' : undefined} // 修改这里
            value={record.initialValue as string[]}
            onChange={(val) => handleInitialValueChange(val, record)}
            style={{ width: '100%' }}
          >
            {record.options.map((val) => (
              <Option key={val} value={val}>
                {val}
              </Option>
            ))}
          </Select>
        )
      }
    } else {
      if (record.valueType === 'input' || record.valueType === 'textarea') {
        return record.initialValue || ''
      } else {
        return (record.initialValue as string[]).join(', ') || ''
      }
    }
  }

  const columns: any[] = [
    {
      title: '数据索引',
      dataIndex: 'dataIndex',
      key: 'dataIndex',
      render: (text: string, record: DataSourceItem) => (
        record.isEditing ? (
          <Input
            value={text}
            onChange={(e) => handleValueChange(record.key, 'dataIndex', e.target.value)}
          />
        ) : (
          text || '无数据索引'
        )
      ),
    },
    {
      title: '组件类型',
      dataIndex: 'valueType',
      key: 'valueType',
      render: (text: string, record: DataSourceItem) => (
        record.isEditing ? (
          <Select
            value={text}
            onChange={(val) => handlevalueTypeChange(val, record)}
            style={{ width: 100 }}
          >
            <Option value='input'>input</Option>
            <Option value='textarea'>textarea</Option>
            <Option value='radio'>radio</Option>
            <Option value='checkbox'>checkbox</Option>
            <Option value='select'>select</Option>
          </Select>
        ) : text
      ),
    },
    {
      title: '选项',
      dataIndex: 'options',
      key: 'options',
      render: (_: any, record: DataSourceItem) => renderOptions(record),
    },
    {
      title: '初始值',
      dataIndex: 'initialValue',
      key: 'initialValue',
      render: (_: any, record: DataSourceItem) => renderInitialValue(record),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_: any, record: DataSourceItem) => (
        <div>
          <Button
            type='link'
            onClick={() => handleEditRow(record.key)}
            style={{ marginRight: 8 }}
          >
            {record.isEditing ? '保存' : '编辑'}
          </Button>
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveRow(record.key)}
          />
        </div>
      ),
    },
  ]

  return (
    <div>
      <Button type='primary' onClick={handleAddRow} style={{ marginBottom: 16 }}>
        添加行
      </Button>
      <EditableProTable<DataSourceItem>
        rowKey='key'
        columns={columns}
        value={value}
        recordCreatorProps={false}
        onChange={onChange}
        onRow={(record) => ({
          onDoubleClick: () => handleEditRow(record.key), // 添加双击事件
        })}
      />
    </div>
  )
}
