import Vue from 'vue';
const axios = require('axios');
const api = require('../../utils/api');

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
    },
    actions: {
        register(context, user) {
            return api.registerUser(user.username, user.email, user.firstName, user.lastName, user.password, user.country, user.dateOfBirth).then((res) => {
                if (res.status == 201) { // Successfully created
                    context.commit('login', res.data); // Login user with returned data
                }
            })
        },
        logout({ commit }) {
            commit("logout");
        }
    }
}