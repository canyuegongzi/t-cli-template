import { createApp } from 'vue';
import getRouter from '@/router';
import store from '@/store';
import App from './App.vue';
// 全局引入指令
import directive from '@/directives';
// 路由权限校验
import { routerInterceptor } from './permission';
import '@/plugins/tailwind';
import '@wu-web/micro-vue3-biz-ui/dist/index.css';

import {
  registerMicroApps,
  start,
  registerGlobalConfig,
  getMicroApps,
  registerElementPlus,
  registerI18n,
} from '@wu-web/micro-vue3-sdk';
// 引入svg-icon组件
import loadSvg from '@/assets';
// 全局样式
import '@/styles/index.scss';

import i18nMap from '@/config/i18n';
import { APP_NAME, microAppList } from '@/config';

const syncRoutes = microAppList.map((item) => {
  return {
    path: `${item.base}/:path(.*)`,
    name: item.name,
    component: () => import('@/views/microPage/Index.vue'),
  };
});

const apps = getMicroApps(microAppList, '#micro-viewport');
const app = createApp(App);

const router = getRouter(syncRoutes);
routerInterceptor(router);
app.use(router).use(store);
// 注册插件

registerI18n(app, i18nMap, {
  before: (_options: any) => {
    return true;
  },
});

registerElementPlus(app);
registerGlobalConfig({
  app: {
    micro: () => false,
    microPath: '/main',
    name: APP_NAME,
  },
  layout: {
    NORMAL_MENU_LEFT_NORMAL_WIDTH: 210,
    NORMAL_MENU_LEFT_CLOSED_WIDTH: 54,
    LAYOUT_TYPE: 'TB',
    // LAYOUT_TYPE: 'LR',
  },
});

loadSvg(app);

directive(app);

// mock接口模拟
if (process.env.RUN_ENV === 'mock') {
  require('./mock');
}
app.mount('#app');

registerMicroApps(apps);
start();
