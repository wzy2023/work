module.exports = {
  // extends: require.resolve('@umijs/max/eslint'),
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 框架相关的
          [`^react$`, `^@umijs/max$`],
          // 组件相关的
          [`^antd$`, `^@ant-design/icons$`, `^@/components$`, `^\\./`],
          // npm包相关的
          [`^dayjs`, `^lodash$`, `^ahooks$`, `^@/utils$`, `^@/hooks`, `^@/services`, `^@/const`, `^@/types`, `./utils$`],
          // 样式相关的
          [`^\\./index\\.less$`, `^@/asset/.*$`],
        ],
      },
    ],
  },
};
