import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  title: '前端笔记',
  description: 'Just playing around.',
  head: [['link', { rel: 'icon', href: 'http://localhost:3000/favicon.ico' }]],
  themeConfig: {
    // 导航栏
    lastUpdated: true,
    logo: 'https://api.jszhan.top//userIcon/cac42855e4b950b96841fd5d9b453651',
    nav: [
      {
        text: '笔记',
        items: [
          {
            text: 'nodejs',
            link: '/note/nodejs/'
          },
          {
            text: '实用工具',
            link: '/note/实用工具/'
          }
        ]
      },
      { text: '示例', link: '/examples/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
      {
        icon: 'gitee',
        link: 'https://github.com'
      }
    ],

    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'vitepress'
    },

    // 侧边栏
    sidebar: {
      '/note/nodejs/': [
        {
          text: 'nodejs',
          items: [{ text: 'websocket', link: '/note/nodejs/websocket' }]
        }
      ],
      '/note/实用工具/': [
        {
          text: '实用工具',
          items: [{ text: 'mock', link: '/note/实用工具/mock' }]
        }
      ],
      '/examples/': [
        {
          text: '基础',
          items: [
            {
              text: '你好，世界',
              link: '/examples/#hello-world'
            },
            {
              text: '处理用户输入',
              link: '/examples/#handling-input'
            },
            {
              text: 'Attribute 绑定',
              link: '/examples/#attribute-bindings'
            },
            {
              text: '条件与循环',
              link: '/examples/#conditionals-and-loops'
            },
            {
              text: '表单绑定',
              link: '/examples/#form-bindings'
            },
            {
              text: '简单组件',
              link: '/examples/#simple-component'
            }
          ]
        },
        {
          text: '实战',
          items: [
            {
              text: 'Markdown 编辑器',
              link: '/examples/#markdown'
            },
            {
              text: '获取数据',
              link: '/examples/#fetching-data'
            },
            {
              text: '带有排序和过滤器的网格',
              link: '/examples/#grid'
            },
            {
              text: '树状视图',
              link: '/examples/#tree'
            },
            {
              text: 'SVG 图像',
              link: '/examples/#svg'
            },
            {
              text: '带过渡动效的模态框',
              link: '/examples/#modal'
            },
            {
              text: '带过渡动效的列表',
              link: '/examples/#list-transition'
            },
            {
              text: 'TodoMVC',
              link: '/examples/#todomvc'
            }
          ]
        },
        {
          // https://eugenkiss.github.io/7guis/
          text: '7 GUIs',
          items: [
            {
              text: '计数器',
              link: '/examples/#counter'
            },
            {
              text: '温度转换器',
              link: '/examples/#temperature-converter'
            },
            {
              text: '机票预订',
              link: '/examples/#flight-booker'
            },
            {
              text: '计时器',
              link: '/examples/#timer'
            },
            {
              text: 'CRUD',
              link: '/examples/#crud'
            },
            {
              text: '画圆',
              link: '/examples/#circle-drawer'
            },
            {
              text: '单元格',
              link: '/examples/#cells'
            }
          ]
        }
      ]
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present YES I DU'
    }
  }
})
