import Vue from 'vue'
import Vuex from 'vuex'
import user from './models/user'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user
    },
    getters
});

export default store