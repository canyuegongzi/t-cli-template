import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import getRouter from '@/router';
import {
  auth,
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
  registerGlobalConfig,
} from '@wu-web/micro-sdk';
import { createWebHashHistory, Router, RouterHistory } from 'vue-router';

let router: Router | null = null;
let instance: App<any> = null!;
let history: RouterHistory = null!;

function render(props: any = {}) {
  auth
    .checkAuth({
      checkAuthFail: () => false,
      checkAuthSuccess: () => true,
      adapter: () => new Promise((resolve) => resolve(true)),
    })
    .then(() => {
      baseRender(props);
    });

  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log('我正在作为子应用运行');
  }
}

/**
 * 子应用初始化
 */
function baseRender(props: any = {}) {
  registerGlobalConfig({
    app: {
      micro: () => !!qiankunWindow.__POWERED_BY_QIANKUN__,
      microPath: '/simple-user-center-web-v2',
    },
    layout: {},
  });
  const { container } = props;
  history = createWebHashHistory();
  router = getRouter(history);
  instance = createApp(App);
  instance.use(getRouter());
  instance.mount(
    container ? container.querySelector('#app') : document.getElementById('app')
  );
}

renderWithQiankun({
  update(): void | Promise<void> {},
  mount(props: QiankunProps) {
    baseRender(props);
  },
  bootstrap() {},
  unmount() {
    if (instance) {
      instance.unmount();
      instance._container.innerHTML = '';
    }
    history?.destroy(); // 不卸载  router 会导致其他应用路由失败
    router = null;
    instance = null;
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
