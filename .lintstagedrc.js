console.log(
  '\033[0;37;44m INFO \033[0m',
  '\033[0;;34m ' +
    `读取了: ${__filename.slice(__dirname.length + 1)}` +
    ' \033[0m'
);

module.exports = {
  // 只对这几种格式的代码进行prettier美化
  '*.{js,jsx,ts,tsx,vue}': ['prettier --write'],
};
