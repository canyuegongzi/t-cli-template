import store from '@/store';

// 检查权限
function checkPermission(el: any, binding: any) {
  const { value } = binding;
  const roles = store.state.user.userInfo.roles; // 用户角色

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value;

      // 有权限
      const hasPermission = roles.some((role: string) => {
        return permissionRoles.includes(role);
      });

      // 无权限
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`);
  }
}

//vue2和vue3中指令对比https://jishuin.proginn.com/p/763bfbd29cb7
export default {
  mounted(el: any, binding: any) {
    checkPermission(el, binding);
  },
  componentUpdated(el: any, binding: any) {
    checkPermission(el, binding);
  },
};
