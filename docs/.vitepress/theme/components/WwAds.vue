<script setup lang="ts">
// import { onMounted, defineProps} from 'vue'

// onMounted(() => {
//   const s = document.createElement('script')
//   s.async = true
//   // s.src = `https://cdn.wwads.cn/js/makemoney.js`
//   document.querySelector('.wwads-container')!.appendChild(s)
// })
defineProps(['src', 'info', 'href'])
</script>

<template>
  <div class="wwads-container">
    <div class="wwads-cn wwads-vertical" data-id="53">
      <a class="ad" :href="href">
        <img :src="src" />
        <div>{{ info }}</div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.wwads-container {
  padding: 1px 15px 10px;
  margin-top: 20px;
  background-color: var(--vt-c-bg-soft);
}
.wwads-vertical {
  background-color: transparent !important;
}
.wwads-text {
  color: var(--vt-c-text-2) !important;
}
.ad {
  display: block;
  padding: 8px 0;
  font-size: 12px;
  line-height: 16px;
}
.ad img {
  width: 100%;
  margin-bottom: 5px;
}
</style>
