import Vue from 'vue';
import Main from './views/Main.vue';
import store from './store';
import './service/http.ts';
import './style/index.css';
import {router} from "./router";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(Main),
}).$mount('#root');
