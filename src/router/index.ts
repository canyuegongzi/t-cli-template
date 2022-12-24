import { createRouter, createWebHashHistory, RouterHistory } from 'vue-router';
import { getRouterPath } from '@wu-web/micro-sdk';

// 固定路由
export const constantRoutes = () => [
  {
    path: getRouterPath('/bench'),
    hidden: true, // 隐藏
    component: () => import('@/views/bench/Index.vue'),
  },
  {
    path: getRouterPath('/home'),
    hidden: true, // 隐藏
    component: () => import('@/views/home/Index.vue'),
  },
  {
    path: getRouterPath('/about'),
    hidden: true, // 隐藏
    component: () => import('@/views/about/Index.vue'),
  },
];

const getRouter = (history: RouterHistory = createWebHashHistory()) => {
  return createRouter({
    history: history,
    routes: constantRoutes(),
  });
};

export default getRouter;
