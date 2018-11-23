// 引用模板
import Vue from 'vue';
import Router from 'vue-router';
import aboutPage from './pages/About.vue'
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            component:Home
        },
        {
            path:'/about',
            component:aboutPage
        },
        {
            path:'/login',
            component:Login
        },
    ]
})
