// Axios setup
const axios = require('axios');
const qs = require('qs');

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

export function registerUser(username, email, firstName, lastName, password, country, dateOfBirth) {
    return axiosInstance.post('/register?', {username, email, firstName, lastName, password, country, dateOfBirth});
}