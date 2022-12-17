import { createApp } from 'vue';
import App from './App.vue';
// 全局引入指令
import directive from '@/directives';
import registerElementPlus from '@/plugins/elementPlus';
import registerGlobalConfig from '@/plugins/globalConfig';
import '@/plugins/tailwind';

const app = createApp(App);

import router from '@/router';
import store from '@/store';
app.use(router).use(store);

// 全局样式
import '@/styles/index.scss';

// 全局引入 elment-plus 和 icon
registerElementPlus(app);
registerGlobalConfig();

// 引入svg-icon组件
import loadSvg from '@/assets';
loadSvg(app);

// 路由权限校验
import './permission';
import i18n from '@/plugins/i18n';

directive(app);

console.log('=====process.env', process.env);

// mock接口模拟
if (process.env.RUN_ENV === 'mock') {
  require('./mock');
}
// require('./mock');
app.use(i18n);
app.mount('#app');
