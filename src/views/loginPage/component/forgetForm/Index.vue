<template>
  <div class="login-form">
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="loginRules"
      size="mini"
    >
      <el-form-item
        label=""
        prop="username"
      >
        <el-input
          clearable
          v-model="formData.username"
          autocomplete="off"
          :prefix-icon="UserIcon"
        />
      </el-form-item>

      <el-form-item class="w-full">
        <el-button
          type="primary"
          class="w-full"
          @click="submit"
          >提交</el-button
        >
      </el-form-item>
      <el-form-item class="w-full">
        <el-button
          class="w-full"
          @click="backForm"
          >返回</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import { loginRules } from '../../utils/rule';
import UserIcon from '../userIcon';

defineOptions({
  name: 'ForgetForm',
});

const props = defineProps({
  updateFormType: {
    type: Function,
  },
});

// 表单
let formData = reactive({
  username: 'admin',
  password: '123456',
});

// 注册
const submit = () => {
  props.updateFormType?.('LOGIN');
};
// 返回
const backForm = () => {
  props.updateFormType?.('LOGIN');
};
</script>
<style scoped>
@import url('./index.scss');
</style>
<style lang="scss" scoped></style>
<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
