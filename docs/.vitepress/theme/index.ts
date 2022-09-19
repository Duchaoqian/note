import { h, App, watch } from 'vue'
import theme from './theme-layout/theme'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import {
  preferComposition,
  preferSFC,
  filterHeadersByPreference,
  preferHtml
} from './components/preferences'

// import SponsorsAside from './components/SponsorsAside.vue'
// import VueJobs from './components/VueJobs.vue'
import VueSchoolLink from './components/VueSchoolLink.vue'
// import Banner from './components/Banner.vue'
import WwAds from './components/WwAds.vue'
export default Object.assign({}, theme, {
  Layout: () => {
    return h(theme.Layout, null, {
      // banner: () => h(Banner),
      'sidebar-top': () => h(PreferenceSwitch),
      'aside-outline-after': () =>
        h(WwAds, {
          src: '/ad/腾讯云特惠.jpg',
          href: 'https://cloud.tencent.com/act/cps/redirect?redirect=2446&cps_key=c7c533c4be80178b2eceb74449f443ba&from=console',
          info: '【腾讯云】多款云产品1折起，买云服务器送免费机器，最长免费续3个月'
        }),
      'aside-bottom': () =>
        h(WwAds, {
          src: '/ad/新用户专属.jpg',
          href: 'https://cloud.tencent.com/act/cps/redirect?redirect=1040&cps_key=c7c533c4be80178b2eceb74449f443ba&from=console',
          info: '【腾讯云】推广者专属福利，新客户无门槛领取总价值高达2860元代金券，每种代金券限量500张，先到先得。'
        })
    })
  },
  enhanceApp({ app, router }) {
    app.provide('prefer-composition', preferComposition)
    app.provide('prefer-sfc', preferSFC)
    app.provide('prefer-html', preferHtml)
    app.provide('filter-headers', filterHeadersByPreference)
    app.component('VueSchoolLink', VueSchoolLink)
    // 百度统计
    watch(router.route, (to, from) => {
      if (typeof _hmt != 'undefined') {
        if (to.path) {
          _hmt.push(['_trackPageview', to.fullPath])
        }
      }
    })
  }
})
