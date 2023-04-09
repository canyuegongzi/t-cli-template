import Mock from 'mockjs';

// 登录
Mock.mock(RegExp('/api/user/login'), 'post', (options: any) => {
  const params = JSON.parse(options.body);
  const { username = '', password = '' } = params;
  return {
    code: 0,
    data: {
      username,
      password,
      admin_token: +new Date() + '',
      roles: [username],
    },
  };
});

// 获取用户信息
Mock.mock(RegExp('/api/user/info'), 'get', () => {
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
});

// 登出
Mock.mock(RegExp('/api/user/logout'), 'get', () => {
  return {
    code: 0,
    flag: 1,
    data: 'logout!!!',
  };
});
