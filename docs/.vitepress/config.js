module.exports = async () => {
  return {
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
        }
      ],
      socialLinks: [{ icon: 'github', link: 'https://github.com' }],

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
        ]
      },

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2019-present YES I DU'
      }
    }
  }
}
