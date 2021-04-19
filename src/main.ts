import Vue from 'vue';
import Main from './views/Main.vue';
import { router } from './router';
import store from './store';
import './service/http.ts';
import './style/index.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(Main),
}).$mount('#root');
