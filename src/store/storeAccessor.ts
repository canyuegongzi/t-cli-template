import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import APPModule from './module/app';

export let appModule: APPModule;

export function initializeStores (store: Store<any>): void {
    appModule = getModule(APPModule, store);
}

export const modules = {
    'appModule': APPModule,
};
