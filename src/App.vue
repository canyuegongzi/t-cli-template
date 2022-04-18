<template>
  <div class="app-wrap">
    <router-link to="/">
      <div>跳转首页</div>
    </router-link>
    <router-link to="/login">
      <div>跳转login</div>
    </router-link>
    <router-link to="/about">
      <div>跳转about</div>
    </router-link>
    <div class="pinia-info">
      <h2>pinia状态管理</h2>
      <div>token: {{ token }}</div>
      <div>version: {{ version }}</div>
      <div @click="handleVersion">设置version</div>
      <div @click="handleToken">设置token</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';

import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';

export default defineComponent({
  components: {},
  setup() {
    const userStore = useUserStore();
    const appStore = useAppStore();
    const token = toRef(userStore, 'token');
    const version = toRef(appStore, 'version');
    const handleVersion = () => {
      appStore.setVersion(++version.value);
    };
    const handleToken = () => {
      appStore.setVersion(Math.random().toString().slice(2, 8));
    };
    return { token, version, handleVersion, handleToken };
  },
});
</script>

<style lang="scss" scoped>
.app-wrap {
  .pinia-info {
    background-color: pink;
    padding: 10px;
  }
}
</style>
