/**
 * 页面布局配置信息
 */

import { ObjTy } from '@/types/common';
import { AppTy } from '@/types/store';

const state: AppTy = {
  sidebar: {
    opened: true,
  },
  device: 'desktop',
  cachedViews: [],
};

const mutations = {
  /*mutations建议以M_开头*/
  // 侧边栏打开
  M_sidebar_opened: (state: AppTy, data: boolean) => {
    state.sidebar.opened = data;
  },
  // 侧边栏打开/关闭
  M_toggleSideBar: (state: AppTy) => {
    state.sidebar.opened = !state.sidebar.opened;
  },

  /*keepAlive缓存*/
  M_ADD_CACHED_VIEW: (state: AppTy, view: string) => {
    if (state.cachedViews.includes(view)) return;
    state.cachedViews.push(view);
  },

  M_DEL_CACHED_VIEW: (state: AppTy, view: string) => {
    const index = state.cachedViews.indexOf(view);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  M_RESET_CACHED_VIEW: (state: AppTy) => {
    state.cachedViews = [];
  },
};
const actions = {
  A_sidebar_opened({ commit }: ObjTy, data: boolean) {
    commit('M_sidebar_opened', data);
  },
};

export default {
  name: 'app',
  namespaced: true,
  state,
  mutations,
  actions,
};
