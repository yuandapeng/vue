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
                meta: { title: 'dashboard', noCache: true },
            }
        ]

    },
    {
        path:'/nest-menu',
        component:Home,
        redirect:"/profile",
        meta: { title: '嵌套路由', icon: 'nested', noCache: true },
        children:[
            {
                path:"/parent",
                component:Profile,
                meta: { title: 'parent', noCache: true },
                children:[
                    {
                        path:"/parent/a",
                        component:aboutPage,
                        name: 'a',
                        meta: { title: 'a', noCache: true },
                    },
                    {
                        path:"/parent/b",
                        component:aboutPage,
                        name: 'b',
                        meta: { title: 'b', noCache: true },
                    }
                ]
            }
        ]
    },
    {
        path:'/icons',
        component: Home,
        meta: { title: '图标', icon: 'icon', noCache: true },
        redirect:"/icons/index",
        children: [
            {
                path: 'index',
                component: () => import('@/pages/icons'),
                name: 'Icons',
                meta: { title: 'icons', icon: 'icon', noCache: true }
            }
        ]
    },
    {
        path:'/table',
        component:Home,
        meta: { title: '表格', icon: 'table' },
        children: [
            {
                path: '/table/index',
                name: 'table',
                component: () => import('@/pages/table'),
                meta: { title: '表格', icon: 'table' },
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
        meta: { title: '404', icon: 'dashboard', noCache: true },
        component: () => import('@/pages/errorPage/404'),
        hidden: true
    },
    {
        path: 'extra-link',
        component: Home,
        children: [
            {
                path: 'https://github.com/yuandapeng/vue',
                meta: { title: '外链', icon: 'link' }
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]


export default new Router({
    routes:RouterMap
})
