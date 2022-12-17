import { createRouter, createWebHashHistory } from 'vue-router';

import Layout from '@/layout/index.vue';

import { RouterTy } from '@/types/router';

// 固定路由
export const constantRoutes: RouterTy = [
  {
    path: '/login',
    hidden: true, // 隐藏
    // component: () => import('@/views/login/login.vue'),
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
    path: '/',
    component: Layout,
    redirect: '/homepage',
    children: [
      {
        path: 'homepage',
        name: 'Homepage',
        // component: () => import('@/views/homepage/index.vue'),
        component: () => import('@/views/homepage/index.vue'),
        meta: {
          title: '首页',
          icon: 'table',
        },
      },
      /*{
        path: '/dashboard',
        name: 'Dashboard',
        // component: () => import('@/views/dashboard/index.vue'),
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '面板',
          icon: 'table',
        },
      },
      {
        path: '/function',
        name: 'Function',
        component: () => import('@/views/function/axios.vue'),
        meta: {
          title: '功能',
          icon: 'table',
        },
      },
      {
        path: '/comps/list',
        name: 'comps-list',
        component: () => import('@/views/comps/list.vue'),
        meta: {
          title: '组件列表',
          icon: 'table',
        },
      },
      {
        path: '/comps/set',
        name: 'comps-set',
        component: () => import('@/views/comps/set.vue'),
        meta: {
          title: '组件设置',
          icon: 'table',
          roles: ['admin'], // 路由权限
        },
      },
      {
        path: '/comps/upload',
        name: 'comps-upload',
        component: () => import('@/views/comps/upload.vue'),
        meta: {
          title: '上传',
          icon: 'table',
        },
      },
      {
        path: '/permission/list',
        name: 'permission-list',
        component: () => import('@/views/permission/list.vue'),
        meta: {
          title: '权限管理列表',
          icon: 'table',
        },
      },
      {
        path: '/permission/set',
        name: 'permission-set',
        component: () => import('@/views/permission/set.vue'),
        meta: {
          title: '权限管理设置',
          icon: 'tree',
          roles: ['admin'],
        },
      },
      {
        path: '/admin/list',
        name: 'admin-list',
        component: () => import('@/views/admin/index.vue'),
        meta: {
          title: '管理员列表',
          icon: 'user',
        },
      },*/
      { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
    ],
  },
];

// 异步路由：需根据用户权限进行筛选
export const asyncRoutes: RouterTy = [];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
