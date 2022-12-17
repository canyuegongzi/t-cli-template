// eslint-disable-next-line
import { defineConfig } from 'windicss/helpers';

console.log('4444');
console.log(
  '\x1B[0;37;44m INFO \x1B[0m',
  '\x1B[0;;34m ' +
    `读取了: ${__filename.slice(__dirname.length + 1)}` +
    ' \x1B[0m'
);

export default defineConfig({
  darkMode: 'class', // or 'media'
  /*corePlugins: {
    preflight: false,
  },*/
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg_color: 'var(--el-bg-color)',
        primary: 'var(--el-color-primary)',
        primary_light_9: 'var(--el-color-primary-light-9)',
        text_color_primary: 'var(--el-text-color-primary)',
        text_color_regular: 'var(--el-text-color-regular)',
        text_color_disabled: 'var(--el-text-color-disabled)',
      },
    },
  },

  extract: {
    // A common use case is scanning files from the root directory
    include: ['**/*.{vue,html,jsx,tsx}'],
    // if you are excluding files, make sure you always include node_modules and .git
    exclude: ['node_modules', '.git', 'dist'],
  },
});
