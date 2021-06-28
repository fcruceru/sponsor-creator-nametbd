// Axios setup
const axios = require('axios');
const qs = require('qs');

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

module.exports = axiosInstance;
module.exports.axios = axiosInstance;

module.exports.registerUser = function(username, email, firstName, lastName, password, country, dateOfBirth) {
    return axiosInstance.post('/register?', {username, email, firstName, lastName, password, country, dateOfBirth});
}

module.exports.login = function(email, password) {
    return axiosInstance.post('/login?', {email, password});
}

module.exports.linkTwitch = function() {
    let clientId = "2g80sz8mijbs5kpyssub08rp217php";
    let redirectUri = "http://localhost:8080/#/";
    let scopes = ["channel:read:subscriptions", "analytics:read:extensions"]; // Might be able to use the second one for aggregating stats
    return axiosInstance.get(`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}&claims={"id_token":{"email":null,"email_verified":null},"userinfo":{"picture":null}}`);
}
