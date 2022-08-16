---
title: Examples
aside: false
footer: false
returnToTop: false
layout: page
---

<script>
import { defineAsyncComponent } from 'vue'
import ReplLoading from '../../.vitepress/theme/components/ReplLoading.vue'

export default {
  components: {
    ExampleRepl: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: javascriptRepl */  './ExampleRepl.vue'),
      loadingComponent: ReplLoading
    })
  }
}
</script>

<ClientOnly>
  <ExampleRepl />
</ClientOnly>