// Axios setup
const axios = require("axios");
const qs = require("qs");
//const { default: router } = require('../src/router');

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

// Getting token on app start
auth = localStorage.getItem("auth");
if (auth) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
}

module.exports = axiosInstance;
module.exports.axios = axiosInstance;

module.exports.registerUser = function(username, email, first_name, last_name, password, country, date_of_birth) {
    return axiosInstance.post("/register?", { username, email, first_name, last_name, password, country, date_of_birth });
};

module.exports.login = function(email, password) {
    return axiosInstance.post("/login?", { email, password });
};

module.exports.setToken = function(token) {
    localStorage.setItem("auth", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

module.exports.updateTwitchToken = async function(code) {
    return axiosInstance.post("/updateTwitchToken", { code });
};
