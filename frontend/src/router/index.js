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
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue")
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
    }
];

const router = new VueRouter({
    routes
});

export default router;
