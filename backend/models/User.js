const db = require("../dao");

const USER_RANKS = {
    "CREATOR": "CREATOR",
    "SPONSOR": "SPONSOR",
    "ADMIN": "ADMIN",

    "UNKNOWN": "UNKNOWN"
};

const USER_STATES = {
    "ACTIVE": "ACTIVE",
    "PENDING_APPROVAL": "PENDING_APPROVAL",
    "BANNED": "BANNED",

    "UNKNOWN": "UNKNOWN"
};

const schema = {
    ID: -1,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    country: null,
    date_of_birth: null,
    rank: USER_RANKS.UNKNOWN,
    state: USER_STATES.UNKNOWN,
    twitch_token: null,
    twitch_metrics: null
};

const User = function (data) {
    let User = JSON.parse(JSON.stringify(schema));

    // Adding only allowed properties
    for (let key of Object.keys(schema)) {
        this[key] = data[key] || User[key];
    }
};

// User.prototype.updateTwitchToken = function(token) {
//     let updatedUser = db.updateTwitchToken(token);
//     this[twitchToken] = updatedUser[twitchToken];

//     return this;
// }

User.prototype.USER_RANKS = User.USER_RANKS = USER_RANKS;
User.prototype.USER_STATES = User.USER_STATES = USER_STATES;

module.exports = User;
