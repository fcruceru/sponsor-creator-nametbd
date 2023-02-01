const SPONSOR_STATES = {
    ACTIVE: "ACTIVE",
    EMAIL_PENDING: "EMAIL_PENDING",
    BANNED: "BANNED",

    UNKNOWN: "UNKNOWN"
};

const schema = {
    ID: -1,
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    country: null,
    state: SPONSOR_STATES.UNKNOWN,
    company_name: null,
    products: null, // Comma-delimited string of values
    preferences: null, // Comma-delimited string of values (e.g. "Twitch,Youtube")
    phone_number: null
};

const Sponsor = function (data) {
    let Sponsor = JSON.parse(JSON.stringify(schema));

    // Adding only allowed properties
    for (let key of Object.keys(schema)) {
        this[key] = data[key] || Sponsor[key];
    }
};

Sponsor.prototype.SPONSOR_STATES = Sponsor.SPONSOR_STATES = SPONSOR_STATES;

module.exports = Sponsor;
