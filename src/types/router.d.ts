import { RouteRecordRaw } from 'vue-router';

// 自定义router接口
interface RouteItemTy {
  hidden?: boolean; // 是否隐藏
  alwaysShow?: boolean; // 是否始终展示
  code?: number;
  name?: string;
  fullPath?: string;
  path?: string;
  meta?: {
    title: string;
    icon?: string;
    affix?: boolean;
    activeMenu?: string;
    breadcrumb?: boolean;
    roles?: Array<string>; // 角色
    code?: number;
  };
  children?: RouterTy; // 子路由
  redirect?: string;
}

// 子路由
type RouterRowTy = RouteRecordRaw & RouteItemTy;

// 子路由数组
type RouterTy = Array<RouterRowTy>;
