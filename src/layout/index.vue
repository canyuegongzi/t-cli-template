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
      <LeftMenu
        :routes="routes"
        :isCollapse="isCollapse"
        :activeMenu="activeMenuRef.currentPath"
        @menu:click="menuClick"
      >
        <template #logo="slotProps">
          <div
            v-if="slotProps.collapse"
            class="logo-container"
          >
            <img
              src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
              class="sidebar-logo"
            />
          </div>
        </template>
      </LeftMenu>
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
        <el-row
          style="width: 100%"
          v-if="isShowHeaderTopMenu()"
        >
          <el-col :span="24">
            <TopMenu
              ref="topMenuRef"
              :routes="routes"
              :isCollapse="isCollapse"
              :activeMenu="activeMenuRef.currentPath"
              @menu:click="menuClick"
            />
          </el-col>
        </el-row>

        <MainContainer :style="{ height: mainHeight }" />
      </div>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import MainHeader from './header';
import {
  BaseLeftMenu as LeftMenu,
  BaseTopMenu as TopMenu,
} from '@wu-web/micro-vue3-biz-ui';
import MainContainer from './main-container.vue';
import routes from '@/config/route';
import { APP_NAME } from '@/config';

import { getCurrentInstance, computed, reactive, ref, watch } from 'vue';
import settings from '@/settings';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'Layout',
});

const { __SETTING__ } = window;

const gbConfig = __SETTING__?.get?.(APP_NAME);
const {
  NORMAL_MENU_LEFT_CLOSED_WIDTH = 54,
  NORMAL_MENU_LEFT_NORMAL_WIDTH = 210,
  LAYOUT_TYPE = 'LR',
} = gbConfig?.layout || {};

let { proxy }: any = getCurrentInstance(); // 当前实例

const activeMenuRef = reactive({
  currentPath: '',
});

// 是否打开
let opened = computed(() => {
  return proxy.$store.state.app.sidebar.opened;
});

// 是否折叠
const isCollapse = computed(() => {
  return proxy.$store.state.app.sidebar.opened;
});

const router = useRouter();
// 监听当前路由
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    activeMenuRef.currentPath = newValue.fullPath;
  },
  { immediate: true, deep: true }
);

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

const menuClick = (item) => {
  if (item.path || item.index) {
    proxy.$router.push({ path: item.path || item.index });
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  overflow: hidden;
  //display: flex;
  //align-content: start;
  //justify-content: start;
  .logo-container {
    display: flex;
    height: 100%;
    align-items: center;
  }
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

.sidebar-logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
</style>
