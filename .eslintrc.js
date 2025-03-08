module.exports = {
  plugins: ['perfectionist'],
  rules: {
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'line-length',
        environment: 'bun',
        maxLineLength: 120,
        sortSideEffects: true,
        groups: [
          ['serverOnly'],

          ['react'],
          { newlinesBetween: 'never' },
          ['next'],
          { newlinesBetween: 'never' },
          ['umi'],

          ['antd'],
          { newlinesBetween: 'ignore' },
          ['component'],
          { newlinesBetween: 'ignore' },
          ['components'],

          ['other'],
          { newlinesBetween: 'ignore' },
          ['hooks'],
          { newlinesBetween: 'ignore' },
          ['api'],
          { newlinesBetween: 'ignore' },
          ['trpc'],

          ['css', 'font'],
          { newlinesBetween: 'ignore' },
          ['asset'],
        ],
        customGroups: {
          value: {
            serverOnly: ['server-only'],
            react: ['^react$', '^react-dom$'],
            umi: ['^@umijs/max$'],
            next: ['^next$', '^next/'],
            antd: ['^antd$', '^@ant-design/*'],
            component: ['react-beautiful-dnd'],
            components: ['@/components/', './components/'],
            trpc: ['^@trpc/', '@/trpc', './trpc'],
            api: ['^@/api'],
            hooks: ['^ahooks$', '^@/hooks', './hooks'],
            other: ['superjson', 'lodash', 'dayjs', 'zod', '@prisma/client'],
            css: ['.css$'],
            asset: ['^@/asset/.*$'],
            font: ['/font/'],
          },
        },
      },
    ],
  },
};
