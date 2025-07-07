<script setup lang="ts">
import { Repl, useStore, useVueImportMap } from "@vue/repl";
import Monaco from "@vue/repl/monaco-editor";

import "@vue/repl/style.css";
import { data } from "./examples.data";
import { inject, watchEffect, version, Ref, ref } from "vue";
import {
  resolveSFCExample,
  resolveNoBuildExample,
  onHashChange,
} from "./utils";
const builtinImportMap = useVueImportMap({
  runtimeDev: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`,
}).importMap;
const store = useStore({
  builtinImportMap,
  showOutput: ref(false),
  outputMode: ref("preview"),
});

const preferComposition =
  (inject("prefer-composition") as Ref<boolean>) || ref();
const preferSFC = (inject("prefer-sfc") as Ref<boolean>) || ref();

watchEffect(updateExample);
onHashChange(updateExample);

/**
 * We perform some runtime logic to transform source files into different
 * API / format combinations:
 * - Options vs. Composition
 * - plain HTML vs. SFCs
 */

function updateExample() {
  let hash = location.hash.slice(1);
  if (!data.hasOwnProperty(hash)) {
    hash = "hello-world";
    location.hash = `#${hash}`;
  }
  store.setFiles(
    preferSFC.value
      ? resolveSFCExample(data[hash], preferComposition.value)
      : resolveNoBuildExample(data[hash], preferComposition.value),
    preferSFC.value ? "App.vue" : "index.html"
  );
}
</script>

<template>
  <Repl
    :store="store"
    :editor="Monaco"
    :showImportMap="!preferSFC"
    :showCompileOutput="false"
    :clearConsole="false"
  />
</template>

<style scoped>
.vue-repl {
  max-width: 1105px;
  width: 100%;
  border-right: 1px solid var(--vt-c-divider-light);
  height: calc(
    100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px) - 20px
  );
}

@media (max-width: 960px) {
  .vue-repl {
    border: none;
    height: calc(
      100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px) - 48px
    );
  }
}
</style>
