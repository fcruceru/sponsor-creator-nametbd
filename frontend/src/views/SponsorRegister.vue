<template>
    <div class="container" style="max-width: 400px">
        <b-form @submit="register">
            <b-form-group id="input-group-firstName" label="First Name:" label-for="input-firstName">
                <b-form-input id="input-firstName" v-model="form.first_name" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-lastName" label="Last Name:" label-for="input-lastName">
                <b-form-input id="input-lastName" v-model="form.last_name" required></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-email"
                label="Company Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input id="input-email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-country" label="Country:" label-for="input-country">
                <country-select id="input-country" v-model="form.country" :country="form.country" topCountry="US" />
            </b-form-group>

            <b-form-group label="Default Preference:">
                <multiselect v-model="form.preferences.value" :options="form.preferences.options" :multiple="true"></multiselect>
            </b-form-group>

            <b-form-group label="What kind of products are you looking to advertise?">
                <multiselect v-model="form.products.value" :options="form.products.options" :multiple="true" :close-on-select="false"></multiselect>
            </b-form-group>

            <b-form-group id="input-group-companyName" label="Company Name:" label-for="input-companyName">
                <b-form-input id="input-companyName" v-model="form.company_name" placeholder="Enter company name" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-phoneNumber" label="Phone Number:">
                <VuePhoneNumberInput v-model="form.phone_number" />
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
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </b-form-text>

            <br />
            <br />
            <label for="text-password">Password Confirm</label>
            <b-form-input autocomplete="new-password" type="password" id="input-passwordConfirm" v-model="form.passwordConfirm" required></b-form-input>

            <b-button class="mt-3" type="submit" variant="primary">Register</b-button>
        </b-form>
    </div>
</template>

<script>
import Vue from "vue";
import vueCountryRegionSelect from "vue-country-region-select";
Vue.use(vueCountryRegionSelect);
import Multiselect from "vue-multiselect";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import Swal from "sweetalert2";

export default {
    components: { Multiselect, VuePhoneNumberInput },
    data() {
        return {
            form: {
                email: null,
                first_name: null,
                last_name: null,
                country: null,
                password: null,
                passwordConfirm: null,
                preferences: {
                    value: null,
                    options: ["Twitch", "Youtube"]
                },
                products: {
                    value: null,
                    options: ["TODO"]
                },
                product_name: "",
                phone_number: ""
            }
        };
    },
    methods: {
        register(event) {
            event.preventDefault();
            if (this.form.preferences.value == null || this.form.preferences.value.length == 0) {
                Swal.fire("Error", "You must select at least one preferred media source.", "error");
            } else if (this.form.products.value == null || this.form.products.value.length == 0) {
                Swal.fire("Error", "You must select at least one product.", "error");
            } else {
                console.log(this.form)
                this.$store.dispatch("auth/registerSponsor", this.form).then((res) => {
                    this.$router.push("/"); // Redirect to homepage
                });
            }
        }
    }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.form-group {
    margin-bottom: 5px;
}
</style>