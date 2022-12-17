<template>
  <svg-icon
    :icon-class="icon"
    className="nav-icon"
  />
</template>

<script lang="ts">
/*使用vue3.0 jsx语法书写*/
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    elIcon: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style lang="scss" scoped></style>
