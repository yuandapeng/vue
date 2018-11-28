import router from './router';
import NProgress from "nprogress";
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from "@/utils/auth";
NProgress.configure({ showSpinner: false });// NProgress Configuration
const whiteList = ['/login']; // no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'});
        } else {
            next();
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }
});

router.afterEach(() => {
    NProgress.done() // finish progress bar
});