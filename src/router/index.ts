import Vue from 'vue';
import VueRouter, { RawLocation } from 'vue-router';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation) {
    // @ts-ignore
    return originalPush.call(this, location).catch((err: any) => err);
};
export const router: VueRouter = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: {
                path: '/home'
            }
        },
        {
            path: '/home',
            component: () => import('../views/home/HomeList.vue'),
        },
        {
            path: '/about',
            component: () => import('../views/about/AboutList.vue'),
        },
        {
            path: '/pug',
            component: () => import('../views/pug/Pug.vue'),
        },

    ]
});
