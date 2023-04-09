import request from '@/services/http-interceptors';
import { ObjTy } from '@/types/common';

// 登录
export function _login(data: ObjTy) {
  return request({
    url: '/api/user/login',
    data,
    method: 'post',
    isAlertErrorMsg: false,
  });
}

// 获取用户信息
export async function _getUserInfo() {
  /*return request({
    url: '/api/user/info',
    method: 'get',
  });*/
  return {
    code: 0,
    flag: 1,
    data: {
      username: 'admin',
      password: '123456',
      avatar: 'https://img2.bosszhipin.com/boss/avatar/avatar_15.png',
      roles: ['admin'],
    },
  };
}

// 登出
export async function _logout() {
  /*return request({
    url: '/api/user/logout',
    method: 'get',
  });*/
  return {
    code: 0,
    flag: 1,
    data: {
      username: 'admin',
      password: '123456',
      avatar: 'https://img2.bosszhipin.com/boss/avatar/avatar_15.png',
      roles: ['admin'],
    },
  };
}
