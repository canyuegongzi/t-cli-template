<template>
  <div class="select-none overflow-hidden">
    <img
      :src="bg"
      class="wave"
    />
    <div class="flex-c absolute right-5 top-3">
      <el-dropdown>
        <span class="el-dropdown-link">
          Theme<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item> Action 2 </el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item>Action 4</el-dropdown-item>
            <el-dropdown-item>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="login-container">
      <div class="img">
        <img :src="illustration" />
      </div>
      <div class="login-box">
        <div
          class="w-full"
          v-if="loginPageStep === 'LOGIN'"
        >
          <LoginForm :updateFormType="updateFormType" />
        </div>
        <div
          class="w-full"
          v-if="loginPageStep === 'REGISTER'"
        >
          <RegisterForm :updateFormType="updateFormType" />
        </div>
        <div
          class="w-full"
          v-if="loginPageStep === 'FORGET'"
        >
          <ForgetForm :updateFormType="updateFormType" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { bg, illustration } from './utils/static';
import LoginForm from './component/loginForm/Index.vue';
import RegisterForm from './component/registerForm/Index.vue';
import ForgetForm from './component/forgetForm/Index.vue';
import { LoginPageStepType } from '@/views/loginPage/type';

defineOptions({
  name: 'LoginPage',
});

const loginPageStep: Ref<LoginPageStepType> = ref('LOGIN');

/**
 * 修改表单类型
 * @param type
 */
const updateFormType = (type: LoginPageStepType) => {
  loginPageStep.value = type;
};
</script>
<style scoped>
@import url('./login.css');
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
