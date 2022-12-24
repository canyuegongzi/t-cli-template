
import { Config } from "@/common/config";

/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
declare global {
  interface Window {
    __SETTING__: Config
  }
}

