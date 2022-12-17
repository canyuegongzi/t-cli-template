<template>
  <div class="main-header flex-center-between">
    <div class="flex-column-center">
      <!-- 是否收起左侧菜单图标 -->
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <!-- 面包屑导航 -->
      <!-- <breadcrumb class="breadcrumb-container" /> -->
    </div>

    <!--菜单标题-->
    <div
      class="header-center-title"
      v-if="settings.showTitle"
    >
      {{ proxy.$route.meta.title }}
    </div>

    <!-- 右侧菜单 -->
    <div
      class="right-menu"
      v-if="settings.ShowDropDown"
    >
      <el-dropdown
        trigger="click"
        size="medium"
      >
        <!-- 头像 -->
        <div class="avatar-wrapper">
          <span class="name">{{ userInfo.username }}</span>
          <img
            :src="userInfo.avatar"
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <!-- 下拉 -->
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <!-- <a target="_blank" href="https://github.com/jzfai/vue3-admin-template">
                            <el-dropdown-item>Github</el-dropdown-item>
                        </a>
                        <a target="_blank" href="https://github.com/jzfai/vue3-admin-template">
                            <el-dropdown-item>Docs</el-dropdown-item>
                        </a> -->
            <el-dropdown-item
              divided
              @click="loginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hamburger from './hamburger.vue';

import { computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';

import settings from '@/settings';

let { proxy }: any = getCurrentInstance();

// 是否打开左侧菜单
const opened = computed(() => {
  return proxy.$store.state.app.sidebar.opened;
});

const userInfo = computed(() => {
  return proxy.$store.state.user.userInfo;
});

console.log('userInfo', userInfo);

// 切换
const toggleSideBar = () => {
  proxy.$store.commit('app/M_toggleSideBar');
};

console.log('====proxy.$route', proxy.$route);
/*
 * 退出登录
 * */
const store = useStore();
const loginOut = () => {
  store.dispatch('user/logout').then(() => {
    ElMessage({ message: '退出登录成功', type: 'success' });
    proxy.$router.push(`/login?redirect=${proxy.$route.fullPath}`);
    Cookies.remove('Admin-Token');
  });
};
</script>

<style lang="scss" scoped>
.main-header {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

//个人头像
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  .name {
    margin-right: 10px;
  }

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

.header-center-title {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

.right-menu {
  cursor: pointer;
  margin-right: 40px;
}
</style>
