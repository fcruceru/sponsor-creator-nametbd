import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue")
    },
    {
        path: "/c-register",
        name: "CreatorRegister",
        component: () => import("../views/CreatorRegister.vue")
    },
    {
        path: "/s-register",
        name: "SponsorRegister",
        component: () => import("../views/SponsorRegister.vue")
    },
    {
        path: "/user-profile",
        name: "UserProfile",
        component: () => import("../views/UserProfile.vue")
    },
    {
        path: "/creator-login",
        name: "CreatorLogin",
        component: () => import("../views/CreatorLogin.vue")
    },
    {
        path: "/sponsor-login",
        name: "SponsorLogin",
        component: () => import("../views/SponsorLogin.vue")
    },
    {
        path: "/admin",
        name: "Admin",
        component: () => import("../views/Admin.vue")
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
