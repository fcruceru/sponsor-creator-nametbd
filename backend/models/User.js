const db = require("../dao");

const schema = {
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    country: null,
    dateOfBirth: null,
    twitchToken: null
};

const User = function (data) {
    let User = JSON.parse(JSON.stringify(schema));

    // Adding only allowed properties
    for (let key of Object.keys(schema)) {
        this[key] = data[key];
    }
};

// User.prototype.updateTwitchToken = function(token) {
//     let updatedUser = db.updateTwitchToken(token);
//     this[twitchToken] = updatedUser[twitchToken];

//     return this;
// }

module.exports = User;
