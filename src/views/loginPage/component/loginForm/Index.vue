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
      <el-form-item
        label=""
        prop="password"
      >
        <el-input
          v-model="formData.password"
          type="password"
          autocomplete="off"
          :prefix-icon="UserPassword"
        />
      </el-form-item>

      <el-form-item>
        <div class="w-full h-[20px] flex justify-between items-center">
          <el-checkbox v-model="checked"> 记住密码 </el-checkbox>
          <el-button
            link
            type="primary"
            @click="forgetPassword"
          >
            忘记密码
          </el-button>
        </div>
      </el-form-item>

      <el-form-item class="w-full">
        <el-button
          type="primary"
          class="w-full"
          @click="loginReq"
          >登录</el-button
        >
      </el-form-item>

      <el-form-item class="w-full">
        <el-button
          class="w-full"
          @click="registerAccount"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, watch, ref, defineProps } from 'vue';
import { loginRules } from '../../utils/rule';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
import { ObjTy } from '@/types/common';
import UserIcon from '../userIcon';
import UserPassword from '../userPassword';
let { proxy }: any = getCurrentInstance();

defineOptions({
  name: 'LoginForm',
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

const checked = ref(false);

const route = useRoute();
// 响应式
let state: ObjTy = reactive({
  redirect: undefined,
});
// 监听路由
watch(
  route,
  (route) => {
    const query = route.query;
    if (query) {
      state.redirect = query.redirect;
    }
  },
  { immediate: true }
);

const store = useStore();
// 登录
let loginReq = () => {
  /*store
    .dispatch('user/login', formData)
    .then((res) => {
      ElMessage({ message: '登录成功', type: 'success' });
      proxy.$router.push({ path: state.redirect || '/' });
    })
    .catch((res) => {
      console.log(res.msg);
    });*/
  Cookies.set('Admin-Token', '123456');
  ElMessage({ message: '登录成功', type: 'success' });
  console.log(store);
  console.log(state);
  console.log(state.redirect);

  proxy.$router.push({ path: state.redirect || '/' });
};

// 点击注册
const registerAccount = () => {
  props.updateFormType?.('REGISTER');
};
// 忘记密码
const forgetPassword = () => {
  props.updateFormType?.('FORGET');
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
