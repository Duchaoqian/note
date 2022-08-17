<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import { data } from './examples.data'
import { inject, watchEffect, ref, Ref, watch } from 'vue'
import { resolveSFCExample, onHashChange, resolveNoBuildExample } from './utils'

let preferHtml = (inject('prefer-html') as Ref<boolean>) || ref()

const store = new ReplStore({
  serializedState: '',
  defaultVueRuntimeURL: ``,
  defaultVueServerRendererURL: ``,
  showOutput: false,
  outputMode: 'preview'
})

store.setImportMap({
  imports: {
    jquery: 'https://unpkg.com/jquery@3.6.0/dist/jquery.min.js'
  }
})

watchEffect(updateExample)
onHashChange(updateExample)
function updateExample() {
  let hash = location.hash.slice(1)
  if (!data.hasOwnProperty(hash)) {
    hash = 'helloworld'
    location.hash = `#${hash}`
  }
  store.setFiles(
    preferHtml.value
      ? resolveSFCExample(data[hash], false)
      : resolveNoBuildExample(data[hash], false),
    'index.html'
  )
}
</script>

<template>
  <Repl :store="store" :showImportMap="true" :showCompileOutput="false" :clearConsole="false" />
</template>

<style scoped>
.vue-repl {
  max-width: 1105px;
  width: 100%;
  border-right: 1px solid var(--vt-c-divider-light);
  height: calc(100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px) - 20px);
}

@media (max-width: 960px) {
  .vue-repl {
    border: none;
    height: calc(100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px) - 48px);
  }
}
</style>
