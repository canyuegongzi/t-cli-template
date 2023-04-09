import { createRouter, createWebHashHistory } from 'vue-router';

import Layout from '@/layout/index.vue';

import { RouterTy } from '@/types/router';

// 固定路由
export const constantRoutes = () => [
  {
    path: '/login',
    hidden: true, // 隐藏
    component: () => import('@/views/loginPage/Index.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true,
  },
  {
    path: '/redirect', // 重定向路由
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)', // 匹配所有path
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },

  {
    path: '/homepage',
    name: 'Homepage',
    component: () => import('@/views/homepage/index.vue'),
    meta: {
      title: '首页',
      icon: 'table',
    },
  },
];

// 异步路由：需根据用户权限进行筛选
export const asyncRoutes: RouterTy = [];

const getRouter = (list: any[] = []) => {
  const routes = (constantRoutes() as any).concat(list);
  return createRouter({
    history: createWebHashHistory(),
    routes: routes,
  });
};

export default getRouter;
