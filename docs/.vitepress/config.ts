export default {
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
        icon: {
          svg: `
          <?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1660482331577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1597" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944") format("woff2"), url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944") format("woff"), url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944") format("truetype"); }
          </style></defs><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#888888" p-id="1598"></path></svg>`
        },
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
}
