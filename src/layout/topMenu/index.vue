<template>
  <div
    id="sideBarTop"
    class="sidebar-top-container flex"
  >
    <el-scrollbar wrap-class="scrollbar-wrapper reset-menu-style">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="horizontal"
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
import SidebarItem from './sidebar-item.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import routes from '@/config/route';

const store = useStore();
const route = useRoute();

/*// 路由
let routes = computed(() => {
  return store.state.permission.routes;
});*/

defineOptions({
  name: 'TopMenu',
});

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
.sidebar-top-container {
  transition: width 0.28s;
  background-color: $menuBg;
  width: 100%;
  z-index: 1001;
  overflow: hidden;
}

.reset-menu-style {
  .el-menu {
    border-right: none;
  }
  .el-scrollbar__wrap {
  }
}
</style>
