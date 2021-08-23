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
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/admin",
        name: "Admin",
        component: () => import("../views/Admin.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;
