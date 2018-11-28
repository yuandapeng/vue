import Vue from 'vue'
import Vuex from 'vuex'
import user from './models/user'
import app from './models/app'
import permission from './models/permission'
import getters from './getters'


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        app,
        permission
    },
    getters
});

export default store