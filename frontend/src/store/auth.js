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
        registerCreator(context, creator) {
            return api
                .registerUser(
                    "creator",
                    creator.username,
                    creator.email,
                    creator.first_name,
                    creator.last_name,
                    creator.password,
                    creator.country,
                    creator.date_of_birth
                )
                .then(res => {
                    if (res.status == 201) {
                        // Successfully created
                        context.commit("login", res.data); // Login user with returned data
                    }
                });
        },
        registerSponsor(context, sponsor) {
            return api
                .registerUser(
                    "sponsor",
                    sponsor.username,
                    sponsor.email,
                    sponsor.first_name,
                    sponsor.last_name,
                    sponsor.password,
                    sponsor.country,
                    sponsor.date_of_birth,
                    sponsor.product_name,
                    sponsor.phone_number
                )
                .then(res => {
                    if (res.status == 201) {
                        // Tell user their request has been submitted and to re-visit this webpage for updates / check their email (?)
                        Swal.fire(
                            "Request submitted!",
                            "Your request will be evaluated and someone will be in contact with you. Please check your email regularly, we should get back to you within 24 hours.",
                            "success"
                        );
                        // TODO: Redirect to "pending approval" page
                    }
                });
        },
        login(context, user) {
            return api
                .login(user.type, user.email, user.password)
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
        setTwitchToken(context, token) {
            return api
                .updateTwitchToken("creator", token)
                .then(res => {
                    context.commit("updateUser", res.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        updateTwitchMetrics(context) {
            return api
                .updateTwitchMetrics("creator")
                .then(res => {
                    context.commit("updateUser", res.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getUpdatedUser(context, type) {
            return api.getUpdatedUser(type).then(res => {
                context.commit("updateUser", res.data);
            });
        },
        getUser(context, data) {
            return api
                .getUser(data["type"], data["id"])
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
