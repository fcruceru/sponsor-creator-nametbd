const db = require("../dao");

const schema = {
    ID: -1,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    country: null,
    date_of_birth: null,
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

module.exports = User;
