const CREATOR_RANKS = {
    "NORMAL": "NORMAL", // TODO: Look into renaming this
    "ADMIN": "ADMIN",

    "UNKNOWN": "UNKNOWN"
};

const CREATOR_STATES = {
    "ACTIVE": "ACTIVE",
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
    rank: CREATOR_RANKS.UNKNOWN,
    state: CREATOR_RANKS.UNKNOWN,
    twitch_token: null,
    twitch_metrics: null
};

const Creator = function (data) {
    let Creator = JSON.parse(JSON.stringify(schema));

    // Adding only allowed properties
    for (let key of Object.keys(schema)) {
        this[key] = data[key] || Creator[key];
    }
};

// User.prototype.updateTwitchToken = function(token) {
//     let updatedUser = db.updateTwitchToken(token);
//     this[twitchToken] = updatedUser[twitchToken];

//     return this;
// }

Creator.prototype.CREATOR_RANKS = Creator.CREATOR_RANKS = CREATOR_RANKS;
Creator.prototype.CREATOR_STATES = Creator.CREATOR_STATES = CREATOR_STATES;

module.exports = Creator;
