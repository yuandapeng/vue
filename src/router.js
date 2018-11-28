// 引用模板
import Vue from 'vue';
import Router from 'vue-router';
import aboutPage from './pages/About.vue'
import Login from "./pages/Login.vue";
import Home from "./pages/Layout.vue";
import Profile from "./pages/Profile";

Vue.use(Router);

export const RouterMap =[
    {
        path:'/',
        component:Home,
        redirect:"/dashboard",
        meta: { title: '工作台', icon: 'dashboard', noCache: true },
        children:[
            {
                path:"/dashboard",
                component:aboutPage,
                meta: { title: '关于', icon: 'dashboard', noCache: true }
            },
            {
                path:"/profile",
                component:Profile,
                meta: { title: '个人资料', icon: 'profile', noCache: true }
            }
        ]
    },
    {
        path:'/login',
        component:Login,
        meta: { title: '登陆', icon: 'dashboard', noCache: true },
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/pages/errorPage/404'),
        hidden: true
    },
    { path: '*', redirect: '/404', hidden: true }
]


export default new Router({
    routes:RouterMap
})
