// Axios setup
const axios = require('axios');
const qs = require('qs');
//const { default: router } = require('../src/router');

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

module.exports = axiosInstance;
module.exports.axios = axiosInstance;

module.exports.registerUser = function (username, email, firstName, lastName, password, country, dateOfBirth) {
    return axiosInstance.post('/register?', { username, email, firstName, lastName, password, country, dateOfBirth });
}

module.exports.login = function (email, password) {
    return axiosInstance.post('/login?', { email, password });
}

module.exports.setToken = function (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}