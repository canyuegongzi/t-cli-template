<template>
  <component
    :is="type"
    v-bind="linkProps(to)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate';
import {
  onMounted,
  computed,
  getCurrentInstance,
  reactive,
  defineProps,
} from 'vue';

// 代理
let { proxy }: any = getCurrentInstance(); // 获取当前实例

// 属性
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

// 判断是否是外链
const isExternalValid = computed(() => {
  return isExternal(proxy.to);
});

// tag类型
const type = computed(() => {
  if (isExternalValid.value) {
    return 'a';
  }
  return 'router-link';
});

// link属性
const linkProps = (to: string) => {
  if (isExternalValid.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener',
    };
  }
  return {
    to: to,
  };
};

// 响应式
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
const state = reactive({
  levelList: null,
});

// mounted生命周期
onMounted(() => {
  // console.log(state.levelList);
  // console.log(props.to);
});
</script>

<style scoped lang="scss"></style>
