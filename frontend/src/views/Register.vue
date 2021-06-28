<template>
  <div class="container" style="max-width: 400px">
    <b-form @submit="register">
      <b-form-group
        id="input-group-email"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-username"
        label="Username:"
        label-for="input-username"
      >
        <b-form-input
          id="input-username"
          v-model="form.username"
          placeholder="Enter username"
          required
          autocomplete="username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-firstName"
        label="First Name:"
        label-for="input-firstName"
      >
        <b-form-input
          id="input-firstName"
          v-model="form.firstName"
          placeholder="Enter first name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-lastName"
        label="Last Name:"
        label-for="input-lastName"
      >
        <b-form-input
          id="input-lastName"
          v-model="form.lastName"
          placeholder="Enter last name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label="Country:"
        label-for="input-country"
      >
        <country-select
          id="input-country"
          v-model="form.country"
          :country="form.country"
          topCountry="US"
        />
      </b-form-group>

      <b-form-group
        id="input-group-dateOfBirth"
        label="Date Of Birth:"
        label-for="input-dateOfBirth"
      >
        <b-form-datepicker
          id="input-dateOfBirth"
          v-model="form.dateOfBirth"
          class="mb-2"
          required
        ></b-form-datepicker>
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
      <b-form-text id="password-help-block">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </b-form-text>

      <br />
      <br />
      <label for="text-password">Password Confirm</label>
      <b-form-input
        autocomplete="new-password"
        type="password"
        id="input-passwordConfirm"
        v-model="form.passwordConfirm"
        required
      ></b-form-input>

      <b-button class="mt-3" type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import vueCountryRegionSelect from "vue-country-region-select";
Vue.use(vueCountryRegionSelect);

export default {
  data() {
    return {
      form: {
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        country: null,
        dateOfBirth: null,
        password: null,
        passwordConfirm: null,
      },
    };
  },
  methods: {
    register(event) {
      event.preventDefault();
      this.$store.dispatch("auth/register", this.form);
    },
  },
};
</script>

<style lang="scss">
.form-group {
    margin-bottom: 5px;
}
</style>