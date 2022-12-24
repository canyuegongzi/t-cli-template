import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import qiankun from 'vite-plugin-qiankun';
// @ts-ignore
import path from 'path';
// useDevMode 开启时与热更新插件冲突
const useDevMode = true; // 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  plugins: [vue(), qiankun('simpleUserCenterWebV2', { useDevMode })],
  resolve: {
    alias: {
      // @ts-ignore
      '@': path.resolve(__dirname, './src'),
      // @ts-ignore
      types: path.resolve(__dirname, './types'),
    },
  },
  base: '/simple-user-center-web-v2',
  server: {
    port: 7105,
    cors: true,
  },
});
