<template>
    <div>
        <b-container class="bv-example-row">
            <b-row>
                <!-- Twitch -->
                <b-col class="bg-twitch-custom"
                    ><h2>Twitch Metrics</h2>
                    <div v-if="!user.twitch_metrics">
                        <h5>Connect your Twitch account.</h5>
                        <b-button variant="outline-twitch" @click="linkTwitch">Connect Twitch</b-button>
                    </div>
                    <div v-else>
                        <p>Connected to Twitch as <a :href="`https://www.twitch.tv/${user.twitch_metrics.display_name}`"><b>{{ user.twitch_metrics.display_name }}</b></a></p>
                        <p>Follow Count: {{ user.twitch_metrics.total_follows }}</p>
                        <p>Total Views: {{ user.twitch_metrics.view_count }}</p>
                        <!-- These metrics require a user to be partnered -->
                        <p v-if="user.twitch_metrics.total_subs">Subscriber Count: {{ user.twitch_metrics.total_subs }}</p>
                        <p v-if="user.twitch_metrics.total_subs">Total Hours Streamed: {{ Math.ceil(user.twitch_metrics.minutes_streamed / 60) }}</p>
                        <p v-if="user.twitch_metrics.total_subs">Average Viewer Count: {{ user.twitch_metrics.avg_viewers }}</p>
                        <p v-if="user.twitch_metrics.total_subs">Highest Viewer Count: {{ user.twitch_metrics.max_viewers }}</p>
                        <p v-if="user.twitch_metrics.total_subs">Total Hours Watched: {{ user.twitch_metrics.hours_watched }}</p>
                        <p v-if="user.twitch_metrics.total_subs">Total Views: {{ user.twitch_metrics.views_total }}</p>
                    </div>
                    <!-- <div>Twitch token: {{ user.twitch_token }}</div>
                    <div>Twitch metrics: {{ user.twitch_metrics }}</div> -->
                </b-col>
                <!-- Youtube -->
                <b-col class="bg-youtube-custom">
                    <h2>Youtube Metrics (TODO)</h2>
                    <div v-if="user.twitch_metrics">
                        <h5>Connect your Youtube account.</h5>
                        <b-button variant="outline-youtube" @click="linkTwitch">Connect Youtube</b-button>
                    </div></b-col
                >
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters["auth/user"];
        }
    },
    async mounted() {
        await this.$store.dispatch("auth/getUpdatedUser", "creator");
    },
    methods: {
        linkTwitch() {
            let clientId = "2g80sz8mijbs5kpyssub08rp217php"; // TODO: Replace with env variable
            let redirectUri = "http://localhost:8080";
            let scopes = ["channel:read:subscriptions"]; // Might be able to use the second one for aggregating stats  "analytics:read:extensions"
            let url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${scopes}&claims={"id_token":{"email":null,"email_verified":null},"userinfo":{"picture":null}}&redirect_uri=${redirectUri}`;

            //let url = `https://id.twitch.tv/oauth2/authorize?client_id=2g80sz8mijbs5kpyssub08rp217php&redirect_uri=http://localhost:8080&response_type=code&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671&claims={"id_token":{"email_verified":null}}'`;
            window.location = encodeURI(url);
        }
    }
};
</script>

<style lang="scss">
@import "@/styles/custom.scss";

.bg-twitch-custom {
    background-color: rgba($color: $twitch, $alpha: 0.4);
    min-height: 50vh;
}

.bg-youtube-custom {
    background-color: rgba($color: $youtube, $alpha: 0.4);
}
</style>