const schema = {
    username: null,
    firstName: null,
    lastName: null,
    password: null,
    country: null,
    dateOfBirth: null
}

const User = function(data) {
    let User = JSON.parse(JSON.stringify(schema));
    
    // Adding only allowed properties
    for (let key of Object.keys(schema)) {
        this[key] = data[key];
    }
}

module.exports = User;