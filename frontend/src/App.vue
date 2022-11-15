<template>
    <div id="app">
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from "@/components/Header";
export default {
    components: {
        Header
    },
    mounted() {
        // Twitch redirect ghetto fix
        if (window.location.href.indexOf("code") > -1) {
            let url = window.location.href.substring(0, window.location.href.length - 2);
            let code = url.substring(url.indexOf("?code=") + 6, url.indexOf("subscriptions") + 14);
            // TODO: Consider refactoring this
            this.$store.dispatch("auth/setTwitchToken", code).then(() => {
                // TODO: Fix not updating vuex store
                this.$store.dispatch("auth/updateTwitchMetrics").then(() => {
                    window.location = `http://localhost:8080/#/`;
                }); 
            });
        }
    }
};
</script>

<style lang="scss">
@import "@/styles/custom.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    //color: #2c3e50;
}

body {
    //background-color: #232323;
}
</style>
