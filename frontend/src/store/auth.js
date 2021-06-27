import Vue from 'vue';
const axios = require('axios');

export default {
    namespaced: true,
    state: {
        loggedIn: false,
        user: null
    },
    getters: {
        user: (state) => state.user,
        loggedIn: (state) => state.loggedIn
    },
    mutations: {
        login(state, user) {
            state.user = user;
            state.loggedIn = true;
        },
        logout(state) {
            state.user = null;
            state.loggedIn = false;
        }
    }
}