<template>
  <b-button variant="outline-success" @click="linkTwitch"
    >Connect Twitch</b-button
  >
</template>

<script>
export default {
  methods: {
    linkTwitch() {
      let clientId = "2g80sz8mijbs5kpyssub08rp217php";
      let redirectUri = "http://localhost:8080";
      let scopes = ["channel:read:subscriptions"]; // Might be able to use the second one for aggregating stats  "analytics:read:extensions"
      let url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${scopes}&claims={"id_token":{"email":null,"email_verified":null},"userinfo":{"picture":null}}&redirect_uri=${redirectUri}`;

      //let url = `https://id.twitch.tv/oauth2/authorize?client_id=2g80sz8mijbs5kpyssub08rp217php&redirect_uri=http://localhost:8080&response_type=code&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671&claims={"id_token":{"email_verified":null}}'`;
      console.log(encodeURI(url));
      window.location = encodeURI(url);
    },
  },
};
</script>

<style lang="scss">
</style>