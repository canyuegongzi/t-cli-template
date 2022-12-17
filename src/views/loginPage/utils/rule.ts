/** 6位数字验证码正则 */
import { reactive } from 'vue';
import { FormRules } from 'element-plus';

export const REGEXP_SIX = /^\d{6}$/;

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

/** 登录校验 */
export const loginRules = reactive(<FormRules>{
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('login.passwordReg'));
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error('login.passwordRuleReg'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  verifyCode: [],
});
