<template>
  <div class="container" style="max-width: 400px">
    <b-form @submit="login">
      <b-form-group
        id="input-group-email"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <label for="input-password">Password</label>
      <b-form-input
        type="password"
        id="input-password"
        aria-describedby="password-help-block"
        v-model="form.password"
        required
        autocomplete="new-password"
      ></b-form-input>

      <b-button class="mt-3" type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      let result = await this.$store.dispatch("auth/login", this.form);
      if (result != null) { // Successful login, contains user object
        this.$router.push("/"); // Redirect to homepage
      }
    },
  },
};
</script>

<style lang="scss">
.form-group {
    margin-bottom: 5px;
}
</style>