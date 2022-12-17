<template>
  <!-- 是否隐藏 -->
  <template v-if="!item.hidden">
    <!-- 展示菜单链接 -->
    <template v-if="showSidebarItem(item.children, item)">
      <div
        v-if="onlyOneChild.meta"
        @click="clickMenuItem(resolvePath(onlyOneChild.path))"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <!-- 自定义图标 -->
          <item :icon="onlyOneChild.meta?.icon || item.meta?.icon" />
          <template #title>{{ onlyOneChild.meta?.title }}</template>
        </el-menu-item>
      </div>
    </template>

    <!-- 子菜单 -->
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <!-- 菜单名、图标 -->
      <template #title>
        <!-- 自定义图标 -->
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
        />
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 递归循环子路由 -->
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
/*可以设置默认的名字*/
export default {
  name: 'SidebarItem',
};
</script>

<script setup lang="ts">
import Link from './link.vue';
import Item from './item';

import { isExternal } from '@/utils/validate';

/*初始化参数比如引入组件，proxy,state等*/
import { getCurrentInstance, onMounted, defineProps } from 'vue';
import path from 'path';
import { RouteItemTy } from '@/types/router';

let { proxy }: any = getCurrentInstance(); // 当前实例

// 属性
defineProps({
  //每一个router Item
  item: {
    type: Object,
    required: true,
  },
  //用于判断是不是子Item,设置响应的样式
  isNest: {
    type: Boolean,
    default: false,
  },
  //基础路径，用于拼接
  basePath: {
    type: String,
    default: '',
  },
});

// 生命周期
onMounted(() => {
  // console.log("我挂载了");
  // console.log(proxy.item);
});

//显示sidebarItem 的情况
proxy.onlyOneChild = null;

// 是否展示菜单链接
let showSidebarItem = (children = [], parent: RouteItemTy) => {
  // 获取展示的子菜单
  const showingChildren = children.filter((item: RouteItemTy) => {
    // 隐藏
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      proxy.onlyOneChild = item;
      return true;
    }
  });

  // 展示的子菜单只有一个，且父菜单未设置始终展示
  if (showingChildren.length === 1 && !parent?.alwaysShow) {
    return true;
  }

  // 没有子菜单
  if (showingChildren.length === 0) {
    proxy.onlyOneChild = { ...parent, path: '', noChildren: true };
    return true;
  }
  return false;
};

// 路由path处理
let resolvePath = (routePath: string) => {
  // 外链
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(proxy.basePath)) {
    return proxy.basePath;
  }
  return path.resolve(proxy.basePath, routePath);
};

const clickMenuItem = (path) => {
  if (path) {
    proxy.$router.push({ path: path });
  }
};
</script>

<style scoped lang="scss"></style>
