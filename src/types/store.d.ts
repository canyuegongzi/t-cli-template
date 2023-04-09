// 引入自定义的路由数组静态类型
import { RouterTy } from '@/types/router';
import { ObjTy } from '@/types/common';

// 自定义StateTy对象
interface StateTy {
  app: AppTy;
  permission: PermissionTy;
  user: UserTy;
}

// 用户信息
interface UserTy {
  userInfo: ObjTy;
  username?: string;
  avatar?: string;
  roles?: Array<string>;
}

// 页面布局信息
interface AppTy {
  sidebar: {
    // 侧边栏
    opened: boolean; // 是否展开
    //opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // withoutAnimation: false
  };
  device: 'desktop'; // 设备
  cachedViews: Array<string>; // 缓存页面
}

// 权限
interface PermissionTy {
  isGetUserInfo: boolean; //是否已经设置了权限
  routes: RouterTy; //将过滤后的异步路由和静态路由集合
  addRoutes: RouterTy; //过滤后的异步路由
}
