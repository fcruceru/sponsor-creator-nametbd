<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="!loggedIn" to="/register">Register</router-link>
      <a v-else @click="logout" style="cursor: pointer; color: #42b983;">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log("logout")
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
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
