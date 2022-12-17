import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import zhCn from "element-plus/es/locale/lang/zh-cn";

// 全局注册elment-icon
import * as ElIconModules from '@element-plus/icons';

function registerElementPlus(app) {
  app.use(ElementPlus, {
    size: 'mini',
    // locale: zhCn
  });

  // 统一注册el-icon图标
  for (const iconName in ElIconModules) {
    const comp = ElIconModules[iconName] || null;
    comp && app.component(comp.name, comp);
  }
}

export default registerElementPlus;
