import Vue from 'vue';
import Main from './views/Main';
import router from './router';
import store from "./store/index";
import './service/http';
import './style/index.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(Main),
}).$mount('#root');
