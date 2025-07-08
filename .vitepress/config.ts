import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "@vue/theme";
import baseConfig from "@vue/theme/config";
import { makedir } from "./pathConfig";
import path from "path";
import { text } from "stream/consumers";
let vuedir = makedir(path.join(__dirname, "../note/vue"), "/note/vue/");

let option = {
  extends: baseConfig,
  title: "编程笔记",
  description: "编程习笔记，课件案例，知识点总结",
  sitemap: {
    hostname: "https://jszhan.top",
  },
  head: [
    ["link", { rel: "canonical", href: "https://jszhan.top" }],
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    // 百度统计
    [
      "script",
      {},
      `
     var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?5fcbb7c150368e4dd13976ab2a173207";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
      `,
    ],
  ],
  markdown: {
    theme: {
      light: "min-dark",
      dark: "min-dark",
    },
  },
  base: "/",
  themeConfig: {
    // 导航栏
    lastUpdated: true,
    editLink: {
      pattern: 'https://github.com/Duchaoqian/note/edit/master/:path',
      text: '在Github上编辑'
    },
    logo: "/logo.jpeg",
    nav: [
      {
        text: "前端",
        items: [
          {
            text: "笔记",
            items: [
              {
                text: "JavaScript",
                link: "/note/JavaScript/",
              },
              {
                text: "nodejs",
                link: "/note/nodejs/",
              },

              {
                text: "TypeScript",
                link: "/note/TypeScript/",
              },
              {
                text: "vue",
                link: "/note/vue/",
              },
              {
                text: "实用工具",
                link: "/note/实用工具/",
              },
            ],
          },
          {
            text: "示例",
            items: [
              {
                text: "html",
                link: "/examples/html/",
              },
              {
                text: "javascript",
                link: "/examples/javascript/",
              },
              {
                text: "jquery",
                link: "/examples/jquery/",
              },
              {
                text: "vue",
                link: "/examples/vue/",
              },
            ],
          },
          {
            text: "开源项目",
            link: "/project/",
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Duchaoqian" },
      {
        icon: "gitee",
        link: "https://gitee.com/du8023",
      },
    ],

    algolia: {
      appId: "HRI7JWTSQZ",
      apiKey: "b24c28c122b3fe4be9f25e643cc9639b",
      indexName: "vitepress",
    },
    // 侧边栏
    sidebar: {
      "/note/nodejs/": [
        {
          text: "nodejs",
          items: [
            ...makedir(path.join(__dirname, "../note/nodejs"), "/note/nodejs/"),
          ],
        },
      ],
      "/note/JavaScript/": [
        {
          text: "JavaScript",
          items: [
            ...makedir(
              path.join(__dirname, "../note/JavaScript"),
              "/note/JavaScript/"
            ),
          ],
        },
      ],
      "/note/实用工具/": [
        {
          text: "实用工具",
          items: [
            ...makedir(
              path.join(__dirname, "../note/实用工具"),
              "/note/实用工具/"
            ),
          ],
        },
      ],
      "/note/vue/": [
        {
          text: "vue知识点",
          items: [...vuedir],
        },
      ],
      "/note/TypeScript/": [
        {
          text: "TypeScript",
          items: [
            ...makedir(
              path.join(__dirname, "../note/TypeScript"),
              "/note/TypeScript/"
            ),
          ],
        },
      ],
      "/examples/html/": [
        {
          text: "html案例",
          items: [
            {
              text: "hello world",
              link: "/examples/html/#helloworld",
            },
          ],
        },
      ],
      "/examples/javascript/": [
        {
          text: "javascript 案例",
          items: [
            {
              text: "轮播图",
              link: "/examples/javascript/#banner",
            },
            {
              text: "放大镜",
              link: "/examples/javascript/#amplification",
            },
            {
              text: "楼层滚动",
              link: "/examples/javascript/#floor-scroll",
            },
            {
              text: "星级评分",
              link: "/examples/javascript/#start-score",
            },
            {
              text: "秒表",
              link: "/examples/javascript/#stopwatch",
            },
            {
              text: "城市三级联动",
              link: "/examples/javascript/#city-three-linkage",
            },
            {
              text: "城市四级联动",
              link: "/examples/javascript/#city-four-linkage",
            },
            {
              text: "笑脸",
              link: "/examples/javascript/#smiling-face",
            },
            {
              text: "拼图",
              link: "/examples/javascript/#image-puzzle",
            },
            {
              text: "抛物线",
              link: "/examples/javascript/#parabolic",
            },
            {
              text: "图片爆炸",
              link: "/examples/javascript/#image-explosion",
            },
            {
              text: "时钟",
              link: "/examples/javascript/#timer",
            },
          ],
        },
        {
          text: "canvas 案例",
          items: [
            {
              text: "canvas 动画特效",
              link: "/examples/javascript/#canvas-ani",
            },
            {
              text: "canvas 连线动画",
              link: "/examples/javascript/#canvas-line",
            },
            {
              text: "canvas 画布",
              link: "/examples/javascript/#drawing-board",
            },
            {
              text: "验证码",
              link: "/examples/javascript/#auth-code",
            },
          ],
        },
      ],
      "/examples/jquery/": [
        {
          text: "jquery案例",
          items: [
            {
              text: "hello world",
              link: "/examples/jquery/#helloworld",
            },
            {
              text: "手风琴",
              link: "/examples/jquery/#accordion",
            },
            {
              text: "数码管计时器",
              link: "/examples/jquery/#digital-tube-timer",
            },
            {
              text: "日历",
              link: "/examples/jquery/#calendar",
            },
          ],
        },
        {
          text: "canvas",
          items: [
            {
              text: "雷达",
              link: "/examples/jquery/#canvas-radar",
            },
          ],
        },
      ],
      "/examples/vue/": [
        {
          text: "基础",
          items: [
            {
              text: "你好，世界",
              link: "/examples/vue/#hello-world",
            },
            {
              text: "处理用户输入",
              link: "/examples/vue/#handling-input",
            },
            {
              text: "Attribute 绑定",
              link: "/examples/vue/#attribute-bindings",
            },
            {
              text: "条件与循环",
              link: "/examples/vue/#conditionals-and-loops",
            },
            {
              text: "表单绑定",
              link: "/examples/vue/#form-bindings",
            },
            {
              text: "简单组件",
              link: "/examples/vue/#simple-component",
            },
          ],
        },
        {
          text: "实战",
          items: [
            {
              text: "Markdown 编辑器",
              link: "/examples/vue/#markdown",
            },
            {
              text: "获取数据",
              link: "/examples/vue/#fetching-data",
            },
            {
              text: "带有排序和过滤器的网格",
              link: "/examples/vue/#grid",
            },
            {
              text: "树状视图",
              link: "/examples/vue/#tree",
            },
            {
              text: "SVG 图像",
              link: "/examples/vue/#svg",
            },
            {
              text: "带过渡动效的模态框",
              link: "/examples/vue/#modal",
            },
            {
              text: "带过渡动效的列表",
              link: "/examples/vue/#list-transition",
            },
            {
              text: "TodoMVC",
              link: "/examples/vue/#todomvc",
            },
          ],
        },
        {
          // https://eugenkiss.github.io/7guis/
          text: "7 GUIs",
          items: [
            {
              text: "计数器",
              link: "/examples/vue/#counter",
            },
            {
              text: "温度转换器",
              link: "/examples/vue/#temperature-converter",
            },
            {
              text: "机票预订",
              link: "/examples/vue/#flight-booker",
            },
            {
              text: "计时器",
              link: "/examples/vue/#timer",
            },
            {
              text: "CRUD",
              link: "/examples/vue/#crud",
            },
            {
              text: "画圆",
              link: "/examples/vue/#circle-drawer",
            },
            {
              text: "单元格",
              link: "/examples/vue/#cells",
            },
          ],
        },
      ],
      "/project/": [
        {
          text: "移动端项目",
          items: [
            {
              text: "新蜂商城",
              link: "/project/mobile/newbee/",
            },
            {
              text: "萤火商城",
              link: "/project/mobile/萤火商城/",
            },
            {
              text: "前端铺子",
              link: "/project/mobile/前端铺子/",
            },
            {
              text: "小情书",
              link: "/project/mobile/小情书/",
            },
            {
              text: "约拍",
              link: "/project/mobile/约拍/",
            },
            {
              text: "饿了吗",
              link: "/project/mobile/饿了吗/",
            },
          ],
        },
        {
          text: "pc端项目",
          items: [
            {
              text: "网易云音乐",
              link: "/project/pc/网易云音乐/",
            },
          ],
        },
      ],
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2019-${new Date().getFullYear()} Mr. Du`,
    },
  },
};

export default defineConfigWithTheme<ThemeConfig>(option as ThemeConfig);
