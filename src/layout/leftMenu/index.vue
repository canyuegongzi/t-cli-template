<template>
  <div
    id="sideBar"
    class="sidebar-container"
  >
    <Logo :collapse="!isCollapse" />

    <el-scrollbar wrap-class="scrollbar-wrapper reset-menu-style">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo.vue';
import SidebarItem from './sidebar-item.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import routes from '@/config/route';

const store = useStore();
const route = useRoute();

defineOptions({
  name: 'LeftMenu',
});

/*// 路由
let routes = computed(() => {
  return store.state.permission.routes;
});*/

console.log('router', routes);

// 是否折叠
const isCollapse = computed(() => {
  return store.state.app.sidebar.opened;
});

// 静态变量
const variables = computed(() => {
  return {
    menuText: '#bfcbd9',
    menuActiveText: '#409EFF',
    subMenuActiveText: '#f4f4f5',
    menuBg: '#304156',
    menuHover: '#263445',
    subMenuBg: '#1f2d3d',
    subMenuHover: '#001528',
    sideBarWidth: '210px',
  };
});

// 高亮路由
const activeMenu = computed(() => {
  const { meta, fullPath } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return fullPath;
});
</script>
<style lang="scss" scoped>
.sidebar-container {
  transition: width 0.28s;
  background-color: $menuBg;
  height: 100%;
  width: 100%;
  /*position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;*/
}

.reset-menu-style {
  .el-menu {
    border-right: none;
  }
  .el-scrollbar__wrap {
    padding-bottom: 8vh;
  }
}
</style>
