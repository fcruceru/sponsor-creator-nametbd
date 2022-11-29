<template>
    <div id="app">
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from "@/components/Header";
import Vue from "vue";

export default {
    components: {
        Header
    },
    mounted() {
        // refresh -> popup -> load & close popup

        // Twitch redirect ghetto fix
        if (window.location.href.indexOf("code") > -1) {
            // Get code from URL and reload page
            let url = window.location.href;
            let code = url.slice(url.indexOf("?code=") + 6, url.indexOf("subscriptions") + 14)
            this.$router.replace({...this.$router.currentRoute});
            // Display waiting popup
            Vue.swal({
                title: "Please Wait",
                text: "Aggregating metrics...",
                icon: "info",
                allowEnterKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Vue.swal.showLoading();
                }
            });
            // TODO: Consider refactoring this
            this.$store.dispatch("auth/setTwitchToken", code).then(() => {
                this.$store.dispatch("auth/updateTwitchMetrics").then(() => {
                    Vue.swal.update({
                        title: "Success",
                        text: "All done!",
                        icon: "success"
                    });
                    setTimeout(() => {
                        Vue.swal.close();
                    }, 2000);
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
