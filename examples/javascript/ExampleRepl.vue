<script setup lang="ts">
import { Repl, useStore } from "@vue/repl";
import codemirror from "@vue/repl/codemirror-editor";

import { data } from "./examples.data";
import { inject, watchEffect, ref, Ref } from "vue";
import {
  resolveSFCExample,
  onHashChange,
  resolveNoBuildExample,
} from "./utils";

let preferHtml = (inject("prefer-html") as Ref<boolean>) || ref();

const store = useStore({
  showOutput: ref(false),
  outputMode: ref("preview"),
});

watchEffect(updateExample);
onHashChange(updateExample);
function updateExample() {
  let hash = location.hash.slice(1);
  if (!data.hasOwnProperty(hash)) {
    hash = "banner";
    location.hash = `#${hash}`;
  }

  store.setFiles(
    preferHtml.value
      ? resolveSFCExample(data[hash], false)
      : resolveNoBuildExample(data[hash], false),
    "index.html"
  );
}
</script>

<template>
  <Repl
    :store="store"
    :editor="codemirror"
    :showImportMap="false"
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
