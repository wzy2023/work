module.exports = {
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 框架相关的
          ['^react$', '^@umijs/max$', 'next'],
          // 组件相关的
          ['^antd$', '^@ant-design/*', '^@/components$', '^\\./'],
          // npm包相关的
          ['^dayjs', '^lodash$', '^ahooks$', '^@/utils$', '^@/hooks', '^@/trpc', '^@/services', '^@/const', '^@/types', './utils$'],
          // 样式相关的
          [ '^@/asset/.*$', '/font/', '.*\\.css$'],
        ],
      },
    ],
  },
};
