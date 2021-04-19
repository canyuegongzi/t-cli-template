import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { initializeStores, modules } from './storeAccessor';

Vue.use(Vuex);

const initializer = (store: Store<any>) => initializeStores(store);
export const plugins = [initializer];
export * from './storeAccessor';
export default new Vuex.Store({
    plugins,
    modules,
    state: {},
    mutations: {},
    actions: {}

});
