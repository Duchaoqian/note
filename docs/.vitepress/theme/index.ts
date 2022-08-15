import { h, App } from 'vue'
import theme from './theme-layout/theme'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import { preferComposition, preferSFC, filterHeadersByPreference } from './components/preferences'

import SponsorsAside from './components/SponsorsAside.vue'
// import VueJobs from './components/VueJobs.vue'
import VueSchoolLink from './components/VueSchoolLink.vue'
// import Banner from './components/Banner.vue'
import WwAds from './components/WwAds.vue'
export default Object.assign({}, theme, {
  Layout: () => {
    return h(theme.Layout, null, {
      // banner: () => h(Banner),
      'sidebar-top': () => h(PreferenceSwitch),
      'aside-outline-after': () => h(WwAds),
      'aside-bottom': () => h(WwAds)
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.provide('prefer-composition', preferComposition)
    app.provide('prefer-sfc', preferSFC)
    app.provide('filter-headers', filterHeadersByPreference)
    app.component('VueSchoolLink', VueSchoolLink)
  }
})
