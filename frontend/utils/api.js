// Axios setup
const axios = require('axios');
const qs = require('qs');
//const { default: router } = require('../src/router');

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

// Getting token on app start
auth = localStorage.getItem('auth')    
if (auth) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
}

module.exports = axiosInstance;
module.exports.axios = axiosInstance;

module.exports.registerUser = function (username, email, firstName, lastName, password, country, dateOfBirth) {
    return axiosInstance.post('/register?', { username, email, firstName, lastName, password, country, dateOfBirth });
}

module.exports.login = function (email, password) {
    return axiosInstance.post('/login?', { email, password });
}

module.exports.setToken = function (token) {
    localStorage.setItem('auth', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

module.exports.updateTwitchToken = async function(token) {
    return axiosInstance.post('/updateTwitchToken', { token });
}