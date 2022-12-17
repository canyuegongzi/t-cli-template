import * as config from '@/config';
const registerGlobalConfig = () => {
  window.__SETTING__ = config;
};

export default registerGlobalConfig;
