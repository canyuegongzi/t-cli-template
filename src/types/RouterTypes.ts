import { ComponentType, LazyExoticComponent } from "react";

/**
 * 路由配置
 */
export interface RouterItem {

    path: string;

    name?: string;

    component: LazyExoticComponent<ComponentType<unknown>>

    exact?: boolean;

    title?: string;

    icon?: string;

    children?: RouterItem[];
}
