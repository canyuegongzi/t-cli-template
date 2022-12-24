<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { getRouterPath } from '@wu-web/micro-sdk';
let { proxy }: any = getCurrentInstance(); // 当前实例

const switchPage = (path: string) => {
  proxy.$router.push({ path: getRouterPath(path) });
};
</script>

<template>
  <div class="container">
    <span class="button-container">
      <button @click="switchPage('/bench')">/</button>
    </span>
    <span class="button-container">
      <button @click="switchPage('/home')">home</button>
    </span>
    <span class="button-container">
      <button @click="switchPage('/about')">about</button>
    </span>
  </div>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.button-container {
  margin-left: 16px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
