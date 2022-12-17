import router, { asyncRoutes } from '@/router';
import store from './store';
import settings from './settings';
import { RouterRowTy } from '@/types/router';
import { getToken } from '@/utils/auth';
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

const whiteList = ['/login']; // 免登录白名单

// 路由加载之前
router.beforeEach(async (to: any, from, next: any) => {
  // 开始加载
  if (settings.isNeedNprogress) NProgress.start();
  // 设置标题
  document.title = getPageTitle(to.meta.title);

  /*
   * 过滤动态路由
   * 1.是否有token
   * 2.判断用户权限, 筛选动态路由
   * */
  const hasToken: string = settings.isNeedLogin ? getToken() : 'temp_token';
  // 是否有token
  if (hasToken) {
    if (to.path === '/login') {
      // 已登录，重定向到首页
      next({ path: '/' });
    } else {
      //是否获取过用户信息
      const isGetUserInfo: boolean = store.state.permission.isGetUserInfo;
      if (isGetUserInfo) {
        // 已获取用户信息，放行
        next();
      } else {
        // 还未获取用户信息
        try {
          let accessRoutes = [];
          if (settings.isNeedLogin) {
            // 需要登录
            // 获取用户角色信息
            const { roles } = await store.dispatch('user/getInfo');
            // 传入用户角色，获取筛选后的路由
            console.log('====roles', roles);
            accessRoutes = await store.dispatch(
              'permission/generateRoutes',
              roles
            );
          } else {
            // 无需登录
            accessRoutes = asyncRoutes; // 不用筛选动态路由
            store.commit('permission/M_routes', accessRoutes); // 保存
          }

          // 添加路由
          accessRoutes.forEach((route: RouterRowTy) => {
            router.addRoute(route);
          });

          // 已经获取用户信息
          store.commit('permission/M_isGetUserInfo', true);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (err) {
          // 报错则重置token
          await store.dispatch('user/resetToken');
          // 重定向到登录页
          next(`/login?redirect=${to.path}`);

          if (settings.isNeedNprogress) NProgress.done();
        }
      }
    }
  } else {
    // 无token
    // 判断路由
    if (whiteList.indexOf(to.path) !== -1) {
      // 无需登录，放行
      next();
    } else {
      // 否则直接跳至登录页，传入回调链接
      next(`/login?redirect=${to.path}`);

      if (settings.isNeedNprogress) NProgress.done();
    }
  }
});

// 路由加载结束
router.afterEach(() => {
  if (settings.isNeedNprogress) NProgress.done();
});
