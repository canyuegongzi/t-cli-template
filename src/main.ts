import { createApp } from 'vue';

import App from './App.vue';

import router from '@/router/index';
import store from '@/store/index';
import './main.scss';
// import '@/assets/css/common.scss';

// console.log(process.env);
// console.table(process.env);

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
