<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home | </router-link>
      <router-link v-if="!loggedIn" to="/register">Register | </router-link>
      <router-link v-else to="/user-profile">User Profile</router-link>
      <router-link v-if="!loggedIn" to="/login">Login</router-link>
      <a v-else @click="logout" style="cursor: pointer; color: #42b983;">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
    }
  },
  mounted() {
    // Getting login token from storage

    // Twitch redirect ghetto fix
    if (window.location.href.indexOf('code') > -1 && !this.$route.query.code){
      let url = window.location.href.substring(0, window.location.href.length - 2);
      let code = url.slice(url.indexOf("?code=") + 6, url.length);
      window.location = `http://localhost:8080/#/?code=${code}`;
    }
    if(this.$route.query.code) {
      this.$store.dispatch("auth/setTwitchToken", this.$route.query.code);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
    background-color: #232323;
}

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
