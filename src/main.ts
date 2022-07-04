// import { createApp } from 'vue';

// import App from './App.vue';

// import router from '@/router/index';
// import store from '@/store/index';

// console.log(process.env);
// console.table(process.env);

// const app = createApp(App);

// app.use(store);
// app.use(router);

// app.mount('#app');

const aaa = 221241;

const eat = () => {
  console.log('eat');
};
console.log(aaa);
console.log(eat);

const dd = [2, 4, 6];
const gg = dd.every((v) => v + 1);
console.log(gg);

// Promise是新增的语法，浏览器支持就支持，不支持就只能polyfill。即挂载一个全局的Promise
const c = new Promise((res, rej) => {});

// async是es8的语法，其实本质上是es6生成器的语法糖，会转换成生成器语法
const ddd = async () => {};
console.log(ddd, 3333);
