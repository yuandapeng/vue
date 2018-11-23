//main.js这是项目的核心文件。全局的配置都在这个文件里面配置
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';
import ElementUI from 'element-ui';
import './icons' // icon
import "./mock";
import "./promission";
Vue.use(ElementUI);
Vue.filter("dateFormart",function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern)
});
import './assets/styles/base.css'
//Vue.config.debug = true;//开启错误提示
Vue.config.productionTip = false
new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
})
