import { UploadFormItem } from '@/components'

import { TextFormItem } from './Material/ContextMenu/TextFormItem'
import { ReferenceImage } from './Material/ContextMenu/ReferenceImage'

import { Text } from './Material/cards/Text'
import { Image } from './Material/cards/Image'
import { Group } from './Material/cards/Group'
import { Prompt } from './Material/cards/Prompt'
import { ImageCreate } from './Material/cards/ImageCreate'
import { Video } from './Material/cards/Video'
import { VideoHandle } from './Material/cards/VideoHandle'

import { oss } from '@/utils'
import { MaterialType } from '../types'

export enum MenuKey {
  copy = 'copy',
  remove = 'remove',
  hidden = 'hidden',
  modify = 'modify',

  addGroup = 'addGroup',
  addChildGroup = 'addChildGroup',

  addChildTextPrompt = 'addChildTextPrompt',

  addChildText = 'addChildText',
  addChildImportText = 'addChildImportText',

  addChildPrompt = 'addChildPrompt',
  addChildImportPrompt = 'addChildImportPrompt',

  addChildImage = 'addChildImage',
  addChildImportImage = 'addChildImportImage',

  addChildVideo = 'addChildVideo',
  addChildImportVideo = 'addChildImportVideo',
  handleVideo = 'handleVideo',

  createWork = 'createWork',
  setReferenceImage = 'setReferenceImage',
  setReferencePrompt = 'setReferencePrompt'
}

export const menuMap = {
  [MenuKey.copy]: {
    menu: {
      label: '复制内容',
      key: MenuKey.copy,
    },
  },
  [MenuKey.modify]: {
    menu: {
      label: '修改内容',
      key: MenuKey.modify,
    },
    form: (data: any) => {
      switch (data.type) {
        case MaterialType.GROUP:
          return [
            {
              title: '标题',
              dataIndex: 'title',
              valueType: 'textarea',
              initialValue: data.data.title,
            },
          ]
        case MaterialType.TEXT:
          return [
            {
              title: '内容',
              dataIndex: 'content',
              valueType: 'textarea',
              initialValue: data.data.content,
              fieldProps: {
                autoSize: {
                  minRows: 5,
                },
              },
            },
          ]
        case MaterialType.PROMPT:
          return [
            {
              title: 'en',
              dataIndex: 'en',
              valueType: 'textarea',
              initialValue: data.data.en,
              fieldProps: {
                autoSize: {
                  minRows: 5,
                },
              },
            },
            {
              title: 'zh',
              dataIndex: 'zh',
              valueType: 'textarea',
              initialValue: data.data.zh,
              fieldProps: {
                autoSize: {
                  minRows: 5,
                },
              },
            },
          ]
      }
    },
  },
  [MenuKey.remove]: {
    menu: {
      label: '删除',
      key: MenuKey.remove,
    },
  },
  [MenuKey.hidden]: {
    menu: {
      label: '隐藏',
      key: MenuKey.hidden,
    },
  },

  [MenuKey.addGroup]: {
    menu: {
      label: '添加分类',
      key: MenuKey.addGroup,
    },
    form: [
      {
        title: '名称',
        dataIndex: 'title',
      },
    ],
  },
  [MenuKey.addChildGroup]: {
    menu: {
      label: '添加子分类',
      key: MenuKey.addChildGroup,
    },
    form: [
      {
        title: '名称',
        dataIndex: 'title',
      },
    ],
  },

  [MenuKey.addChildTextPrompt]: {
    menu: {
      label: '添加文本与提示词',
      key: MenuKey.addChildTextPrompt,
    },
    form: [
      {
        title: '提示词',
        dataIndex: 'prompt',
        valueType: 'textarea',
        fieldProps: {
          autoSize: {
            minRows: 5,
          },
        },
      },
    ],
  },

  [MenuKey.addChildText]: {
    menu: {
      label: '生成文本',
      key: MenuKey.addChildText,
    },
    form: [
      {
        dataIndex: 'list',
        renderFormItem: () => <TextFormItem />,
      },
    ],
  },
  [MenuKey.addChildImportText]: {
    menu: {
      label: '导入文本',
      key: MenuKey.addChildImportText,
    },
    form: [
      {
        title: '文本',
        dataIndex: 'content',
        valueType: 'textarea',
        fieldProps: {
          autoSize: {
            minRows: 5,
          },
        },
      },
    ],
  },

  [MenuKey.addChildPrompt]: {
    menu: {
      label: '生成提示词',
      key: MenuKey.addChildPrompt,
      children: [
        // 运行时生成
      ],
    },
  },
  [MenuKey.addChildImportPrompt]: {
    menu: {
      label: '导入提示词',
      key: MenuKey.addChildImportPrompt,
    },
    form: [
      {
        title: '中文',
        dataIndex: 'zh',
        valueType: 'textarea',
        fieldProps: {
          autoSize: {
            minRows: 5,
          },
        },
      },
      {
        title: '英文',
        dataIndex: 'en',
        valueType: 'textarea',
        fieldProps: {
          autoSize: {
            minRows: 5,
          },
        },
      },
    ],
  },

  [MenuKey.addChildImage]: {
    menu: {
      label: '生成图片',
      key: MenuKey.addChildImage,
    },
  },
  [MenuKey.addChildImportImage]: {
    menu: {
      label: '导入图片',
      key: MenuKey.addChildImportImage,
    },
    form: [
      {
        dataIndex: 'list',
        renderFormItem: () => <UploadFormItem mode='image' oss={oss} />,
      },
    ],
  },

  [MenuKey.addChildVideo]: {
    menu: {
      label: '生成视频',
      key: MenuKey.addChildVideo,
    },
  },
  [MenuKey.addChildImportVideo]: {
    menu: {
      label: '导入视频',
      key: MenuKey.addChildImportVideo,
    },
    form: [
      {
        dataIndex: 'list',
        renderFormItem: () => <UploadFormItem mode='video' oss={oss} />,
      },
    ],
  },
  [MenuKey.handleVideo]: {
    menu: {
      label: '处理视频',
      key: MenuKey.handleVideo,
    },
  },

  [MenuKey.createWork]: {
    menu: {
      label: '创建作品',
      key: MenuKey.createWork,
    },
  },
  [MenuKey.setReferenceImage]: {
    menu: {
      label: '添加参考图',
      key: MenuKey.setReferenceImage,
    },
    form: [
      {
        dataIndex: 'referenceImage',
        renderFormItem: () => <ReferenceImage />,
      },
    ],
  },
  [MenuKey.setReferencePrompt]: {
    menu: {
      label: '设置提示词',
      key: MenuKey.setReferencePrompt,
    },
    form: [
      {
        dataIndex: 'referencePrompt',
        valueType: 'textarea',
        initialValue: '宝宝在T台慢慢走秀，要保持笑容满面，眼神一直注视着镜头',
      },
    ],
  },
}

export const nodeRenderMap: any = {
  [MaterialType.GROUP]: Group,
  [MaterialType.TEXT]: Text,
  [MaterialType.PROMPT]: Prompt,
  [MaterialType.IMAGECREATE]: ImageCreate,
  [MaterialType.IMAGE]: Image,
  [MaterialType.VIDEO]: Video,
  [MaterialType.VIDEOHANDLE]: VideoHandle,
}

export const nodeMenuMap: any = {
  [MaterialType.EMPTY]: [
    menuMap.addGroup,
  ],
  [MaterialType.GROUP]: [
    menuMap.modify,
    menuMap.addChildGroup,
    menuMap.addChildTextPrompt,
    menuMap.addChildImportText,
    menuMap.addChildImportVideo,
    menuMap.addChildImportImage,
    menuMap.addChildText,
    menuMap.remove,
  ],
  [MaterialType.TEXT]: [
    menuMap.copy,
    menuMap.modify,
    menuMap.addChildImportPrompt,
    menuMap.addChildPrompt,
    menuMap.hidden,
    menuMap.remove,
  ],
  [MaterialType.PROMPT]: [
    menuMap.copy,
    menuMap.modify,
    menuMap.addChildImportImage,
    menuMap.addChildImage,
    menuMap.setReferenceImage,
    menuMap.hidden,
    menuMap.remove,
  ],
  [MaterialType.IMAGECREATE]: [
    menuMap.addChildImportImage,
    menuMap.hidden,
    menuMap.remove,
  ],
  [MaterialType.IMAGE]: [
    menuMap.setReferencePrompt,
    menuMap.addChildImportVideo,
    menuMap.addChildVideo,
    menuMap.hidden,
    menuMap.remove,
  ],
  [MaterialType.VIDEO]: [
    menuMap.handleVideo,
    menuMap.addChildImportVideo,
    menuMap.createWork,
    menuMap.hidden,
    menuMap.remove,
  ],
  [MaterialType.VIDEOHANDLE]: [
    menuMap.createWork,
    menuMap.hidden,
    menuMap.remove,
  ],
}

export const projectSettingMap = {
  'a736a950-7db3-43e9-aca5-bd6245723a1f': {
    mode: 1,
    tags: ['亲子', '母婴', '萌娃', '宝贝', '人类幼崽', '可爱', '宝宝', '萌娃走秀'],
  },
  'bd45809d-ba35-4409-b8f3-0bed6b0e9e89': {
    mode: 2,
    tags: ['美女'],
  },
}
