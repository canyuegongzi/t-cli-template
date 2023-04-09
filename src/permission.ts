import settings from './settings';
import NProgress from 'nprogress'; // 进度条
NProgress.configure({ showSpinner: false }); // NProgress Configuration
import 'nprogress/nprogress.css';

// 获取页面标题
// 这里用箭头函数会报错
function getPageTitle(title: any) {
  const _title = settings.title || 'vue3-webpack5-admin';
  if (title) {
    return `${title} - ${_title}`;
  }
  return `${_title}`;
}

export const routerInterceptor = (router) => {
  // 路由加载之前
  router.beforeEach(async (to: any, from, next: any) => {
    // 开始加载
    if (settings.isNeedNprogress) NProgress.start();
    // 设置标题
    document.title = getPageTitle(to.meta.title);

    next();
  });

  // 路由加载结束
  router.afterEach(() => {
    if (settings.isNeedNprogress) NProgress.done();
  });
};
