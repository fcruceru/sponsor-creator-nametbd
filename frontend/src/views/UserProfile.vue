<template>
    <b-button variant="outline-success" @click="linkTwitch">Connect Twitch</b-button>
</template>

<script>
import api from "../../utils/api";

export default {
    methods: {
        linkTwitch() {
            api.linkTwitch();
        }
    }
}
</script>

<style lang="scss">

</style>