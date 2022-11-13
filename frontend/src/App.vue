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
            console.log(code);
            window.location = `http://localhost:8080/#/`;
            this.$store.dispatch("auth/setTwitchToken", code);

            //this.$router.push({path: `http://localhost:8080/#/?code=${code}`})
            //window.location = `http://localhost:8080/#/?code=${code}`;
            //this.$router.replace({ path: "/", query: { code: code } });
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
