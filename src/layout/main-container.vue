<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <router-view class="page-content" />
    <div id="micro-viewport" />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.page-content {
  padding: 10px;
  // height: calc(~ '100vh - #{$navBarHeight}');
  // height: calc(100vh - #{$navBarHeight});
  width: 100%;
  position: relative;
  overflow: auto;
}
</style>
