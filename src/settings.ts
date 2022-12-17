// 自定义接口
interface SettingTy {
  title: string; // 标题
  fixedHeader: boolean; // 是否固定头部
  sidebarLogo: boolean; // 侧边栏logo
  showTitle: boolean; // 是否展示标题
  showLeftMenu: boolean; //
  ShowDropDown: boolean;
  showHamburger: boolean; // 是否展示左上角收缩菜单图标
  isNeedLogin: boolean; // 是否需要登录
  isNeedNprogress: boolean; // 是否需要加载动效
  showTagsView: boolean;
  tagsViewNum: number;
  openProdMock: boolean;
  errorLog: string | Array<string>;
  permissionMode: string; // 权限校验模式
}

// 全局配置信息
const setting: SettingTy = {
  title: 'Vue3-webpack5-admin',
  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the title in Navbar
   */
  showTitle: false,
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showLeftMenu: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the drop-down
   */
  ShowDropDown: true,
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description Whether need login
   */
  isNeedLogin: true, // 是否需要登录

  /**
   * @type {boolean} true | false
   * @description Whether need nprogress
   */
  isNeedNprogress: true,

  /**
   * @type {boolean} true | false
   * @description Whether show TagsView
   */
  showTagsView: true,
  /**
   * @description TagsView show number
   */
  tagsViewNum: 6,
  //showSettings: true
  /**
   * @type {boolean} true | false
   * @description Whether  open prod mock
   */
  openProdMock: true, // 是否启动mock
  /**
   * @type {string | array} 'serve' | ['build', 'serve']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['build', 'serve']
   */
  errorLog: ['build'],
  /**
   * @type {string} 'roles' | 'code'
   */
  permissionMode: 'roles', // 默认根据用户角色来判断权限
};

export default setting;
