import { _login, _logout, _getUserInfo } from '@/services/apis/user';
import { setToken, removeToken } from '@/utils/auth';
import { ObjTy } from '@/types/common';
import { UserTy } from '@/types/store';

import store from '@/store';

// 默认state
const getDefaultState = () => {
  return {
    userInfo: {}, // 个人信息
  };
};

const state = getDefaultState();

const mutations = {
  M_userInfo: (state: UserTy, userInfo: object) => {
    state.userInfo = userInfo;
  },
};

const actions = {
  // 登录
  login({ commit }: ObjTy, data: ObjTy) {
    return new Promise((resolve, reject) => {
      _login(data)
        .then((res: ObjTy) => {
          if (res.code === 0) {
            // 保存token
            setToken(res.data?.admin_token);
            localStorage.setItem('userinfo', JSON.stringify(res.data));
            resolve(null);
          } else {
            reject(res);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  getInfo({ commit }: ObjTy) {
    return new Promise((resolve, reject) => {
      _getUserInfo()
        .then((res: ObjTy) => {
          if (res.code === 0) {
            const userinfo: any = localStorage.getItem('userinfo');
            Object.assign(res.data, JSON.parse(userinfo));
            const { roles } = res.data;

            // const rolesArr: any = localStorage.getItem('roles')
            // if (rolesArr) {
            //   roles = JSON.parse(rolesArr)
            // } else {
            //   localStorage.setItem('roles', JSON.stringify(roles))
            // }
            localStorage.setItem('roles', JSON.stringify(roles));
            commit('M_userInfo', res.data);
            resolve(res.data);
          } else {
            reject('failed');
          }
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
  },
  // 登出
  logout() {
    return new Promise((resolve, reject) => {
      _logout()
        .then(() => {
          removeToken(); // 释放token
          localStorage.removeItem('userinfo');
          localStorage.removeItem('roles');
          store.commit('permission/M_isGetUserInfo', false);
          resolve(null);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  // 重置token
  resetToken() {
    return new Promise((resolve) => {
      removeToken();

      resolve(null);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
