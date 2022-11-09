<template>
    <div id="nav">
        <router-link to="/">Home | </router-link>
        <router-link v-if="!loggedIn" to="/s-register">Sponsor Register | </router-link>
        <router-link v-else to="/user-profile">User Profile | </router-link>
        <router-link v-if="!loggedIn" to="/sponsor-login">Sponsor Login | </router-link>
        <router-link v-if="!loggedIn" to="/c-register">Creator Register | </router-link>
        <router-link v-if="!loggedIn" to="/creator-login">Creator Login</router-link>
        <a v-else @click="logout" style="cursor: pointer; color: #42b983">Logout</a>
        <router-link v-if="user && user.rank == 'CREATOR'" to="/admin"> | Admin</router-link>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/");
        }
    },
    computed: {
        user() {
            return this.$store.getters["auth/user"];
        },
        loggedIn() {
            return this.$store.getters["auth/loggedIn"];
        }
    }
};
</script>

<style lang="scss" scoped>
#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>