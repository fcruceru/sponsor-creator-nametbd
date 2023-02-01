<template>
    <div id="notVerifiedBanner" v-if="this.loggedIn && this.user.state == 'EMAIL_PENDING'">
        <h3 class="align-middle">
            <b-icon-exclamation-triangle-fill ></b-icon-exclamation-triangle-fill>
            Please verify your email address.
        </h3>
    </div>
</template>

<script>
export default {
    methods: {},
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
#notVerifiedBanner {
    background-color: orange;
    height: 100%;
}
h3 {
    margin: auto;
}
</style>