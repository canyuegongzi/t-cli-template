import { asyncRoutes } from '@/router';
import settings from '@/settings';
import { PermissionTy } from '@/types/store';
import { RouteItemTy, RouterRowTy, RouterTy } from '@/types/router';
import { ObjTy } from '@/types/common';

/**
 * 根据路由meta.code判断路由权限
 * @param codeArr
 * @param routeItem
 */
function hasCodePermission(codeArr: Array<number>, routeItem: RouteItemTy) {
  if (routeItem.meta && routeItem.meta.code) {
    return codeArr.includes(routeItem.meta.code) || routeItem.hidden;
  } else {
    return true;
  }
}
/**
 * 根据路由的meta.code来筛选动态路由
 * @param codeArr
 * @param asyncRoutes
 */
function filterRouterByCodeArr(
  codeArr: Array<number>,
  asyncRoutes: RouterTy
): Promise<RouterTy> {
  return new Promise((resolve) => {
    const filterRouter: RouterTy = [];
    // 遍历所有异步路由
    asyncRoutes.forEach(async (routeItem: RouterRowTy) => {
      if (hasCodePermission(codeArr, routeItem)) {
        // 有权限
        if (routeItem.children) {
          routeItem.children = await filterRouterByCodeArr(
            codeArr,
            routeItem.children
          ); // 递归筛选子路由
        }
        filterRouter.push(routeItem);
      }
    });
    resolve(filterRouter); // 抛出筛选后的路由
  });
}

/**
 * 根据用户角色判断路由权限
 * @param roles
 * @param route
 */
function hasPermission(roles: Array<string>, route: RouteItemTy) {
  // 只有该路由设置的角色中包含用户的角色，即有权限
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role));
  } else {
    // 未设置则有权限
    return true;
  }
}

/**
 * 根据用户角色筛选路由
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouterTy, roles: Array<string>) {
  const res: RouterTy = [];
  routes.forEach((route) => {
    const tmp = { ...route }; // 扩展运算符浅拷贝
    if (hasPermission(roles, tmp)) {
      // 有权限
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles); // 递归筛选子路由
      }
      res.push(tmp);
    }
  });

  return res; // 返回筛选后的路由
}

// state
const state: PermissionTy = {
  isGetUserInfo: false, // get userInfo
  routes: [], //将过滤后的异步路由和静态路由集合
  addRoutes: [], //过滤后的异步路由
};

const actions = {
  // 根据用户权限筛选路由
  generateRoutes({ commit }: ObjTy, roles: Array<string>) {
    return new Promise(async (resolve) => {
      let accessedRoutes;
      // 根据用户角色来校验权限
      if (settings.permissionMode === 'roles') {
        // 如果是管理员，拥有最高权限，可访问所有动态路由
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || [];
        } else {
          // 否则，进行筛选
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
      } else {
        // 根据code来进行权限校验
        let codeArr: any = localStorage.getItem('codeArr');
        if (codeArr) {
          codeArr = JSON.parse(codeArr);
        } else {
          localStorage.setItem('codeArr', JSON.stringify([1]));
          codeArr = localStorage.getItem('codeArr');
        }
        accessedRoutes = await filterRouterByCodeArr(codeArr, asyncRoutes);
      }

      commit('M_routes', accessedRoutes); // 将筛选后的路由保存到state

      resolve(accessedRoutes); // 返回筛选后的路由
    });
  },
};

const mutations = {
  // 保存路由
  M_routes: (state: PermissionTy, routes: RouterTy) => {
    state.addRoutes = routes;
    // state.routes = constantRoutes().concat(routes);
  },
  M_isGetUserInfo: (state: PermissionTy, data: boolean) => {
    state.isGetUserInfo = data;
  },
};

export default {
  name: 'permission',
  namespaced: true,
  state,
  mutations,
  actions,
};
