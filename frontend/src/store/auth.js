import Vue from "vue";
const axios = require("axios");
const api = require("../../utils/api");
import { router } from "../router";
import Swal from "sweetalert2";

export default {
    namespaced: true,
    state: {
        loggedIn: false,
        user: null
    },
    getters: {
        user: state => state.user,
        loggedIn: state => state.loggedIn
    },
    mutations: {
        login(state, user) {
            state.user = user;
            state.loggedIn = true;
        },
        logout(state) {
            state.user = null;
            state.loggedIn = false;
        },
        updateUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        registerCreator(context, user) {
            user.rank = "CREATOR";
            user.state = "ACTIVE";

            return api.registerUser(user.username, user.email, user.first_name, user.last_name, user.password, user.country, user.date_of_birth, user.rank, user.state).then(res => {
                if (res.status == 201) {
                    // Successfully created
                    context.commit("login", res.data); // Login user with returned data
                }
            });
        },
        registerSponsor(context, user) {
            user.rank = "SPONSOR";
            user.state = "PENDING_APPROVAL";

            return api.registerUser(user.username, user.email, user.first_name, user.last_name, user.password, user.country, user.date_of_birth, user.rank, user.state, user.product_name, user.phone_number).then(res => {
                if (res.status == 201) {
                    // Tell user their request has been submitted and to re-visit this webpage for updates / check their email (?)
                    Swal.fire("Request submitted!", "Your request will be evaluated and someone will be in contact with you. Please check your email regularly, we should get back to you within 24 hours.", "success");
                }
            });
        },
        login(context, user) {
            return api
                .login(user.email, user.password)
                .then(res => {
                    context.commit("login", res.data.user);
                    api.setToken(res.data.token);
                    return res.data;
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.data.reason) {
                        Vue.swal("Error", error.response.data.reason, "error");
                    }
                });
        },
        logout(context) {
            context.commit("logout");
        },
        async setTwitchToken(context, token) {
            let updatedUser = await api.updateTwitchToken(token);
            context.commit("updateUser", updatedUser.data);
        }
    }
};
