<template>
  <el-container
    id="wrap"
    class="app-wrapper"
    :class="classObj"
  >
    <el-aside
      v-if="isShowAside()"
      :width="leftMenuWidth"
    >
      <LeftMenu />
    </el-aside>
    <el-container>
      <div
        id="main"
        class="main-container"
      >
        <MainHeader
          v-if="isShowHeader()"
          ref="headerRef"
        />
        <TopMenu
          v-if="isShowHeaderTopMenu()"
          ref="topMenuRef"
        />
        <MainContainer :style="{ height: mainHeight }" />
      </div>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import MainHeader from './header';
import LeftMenu from './leftMenu';
import TopMenu from './topMenu';
import MainContainer from './main-container.vue';

import { getCurrentInstance, computed, reactive, ref } from 'vue';
import settings from '@/settings';

defineOptions({
  name: 'Layout',
});

const { __SETTING__ } = window;
const {
  NORMAL_MENU_LEFT_CLOSED_WIDTH = 54,
  NORMAL_MENU_LEFT_NORMAL_WIDTH = 210,
  LAYOUT_TYPE = 'LR',
} = __SETTING__.layout || {};

// getCurrentInstance 支持访问内部组件实例。
let { proxy }: any = getCurrentInstance(); // 当前实例

// 是否打开
let opened = computed(() => {
  return proxy.$store.state.app.sidebar.opened;
});

const topMenuRef = ref(null);
const headerRef = ref(null);
// 计算属性 class样式
let classObj = computed(() => {
  return {
    closeSidebar: !opened.value,
    hideSidebar: !settings.showLeftMenu,
  };
});

const baseConfig = reactive({
  normalWidth: NORMAL_MENU_LEFT_NORMAL_WIDTH,
  closedWidth: NORMAL_MENU_LEFT_CLOSED_WIDTH,
  layoutType: LAYOUT_TYPE,
});

/**
 * 宽度
 */
const leftMenuWidth = computed(() => {
  return (
    (opened.value ? baseConfig.normalWidth : baseConfig.closedWidth) + 'px'
  );
});

const mainHeight = computed(() => {
  if (baseConfig.layoutType === 'LR') {
    return `calc(100vh - ${headerRef?.value?.$el.clientHeight}px)`;
  }
  if (baseConfig.layoutType === 'TB') {
    return `calc(100vh - ${topMenuRef?.value?.$el.clientHeight}px)`;
  }
  return '100%';
});

/**
 * 是否显示左侧菜单
 */
const isShowAside = () => {
  if (baseConfig.layoutType === 'LR') {
    return true;
  }
  return false;
};

/**
 * 是否显示左侧菜单
 */
const isShowHeader = () => {
  if (baseConfig.layoutType === 'LR') {
    return true;
  }
  return false;
};

/**
 * 是否显示顶部菜单
 */
const isShowHeaderTopMenu = () => {
  if (baseConfig.layoutType === 'TB') {
    return true;
  }
  return false;
};
</script>

<style lang="scss">
.app-wrapper {
  overflow: hidden;
  //display: flex;
  //align-content: start;
  //justify-content: start;
}
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  // margin-left: $sideBarWidth;
  position: relative;
  width: 100%;
}
.sidebar-container {
  transition: width 0.28s;
  //width: $sideBarWidth !important;
  background-color: $menuBg;
  height: 100%;
  //position: fixed;
  //font-size: 0;
  //top: 0;
  //bottom: 0;
  //left: 0;
  //z-index: 1001;
  overflow: hidden;
}

// 关闭左侧菜单
.closeSidebar {
  .sidebar-container {
    //width: 54px !important;
  }
  .main-container {
    //margin-left: 54px !important;
  }
}

// 隐藏菜单
.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>
