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

module.exports.registerUser = function(type, username, email, first_name, last_name, password, country, date_of_birth) {
    return axiosInstance.post("/register?", { username, email, first_name, last_name, password, country, date_of_birth }, { params: { type } });
};

module.exports.login = function(type, email, password) {
    return axiosInstance.post("/login?", { email, password }, { params: { type } });
};

module.exports.setToken = function(token) {
    localStorage.setItem("auth", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

module.exports.updateTwitchToken = async function(type, code) {
    return axiosInstance.post("/updateTwitchToken", { code }, { params: { type } });
};

module.exports.updateTwitchMetrics = async function(type) {
    return axiosInstance.post("/updateTwitchMetrics", {}, { params: { type } });
};

module.exports.getUser = function(type, id) {
    return axiosInstance.get(`/users/${id}`, { params: { type } });
};

module.exports.getUpdatedUser = function(type) {
    return axiosInstance.get("/user", { params: { type } });
};
