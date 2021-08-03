const db = require("better-sqlite3")(__dirname + "/sqlite.db");
const User = require("./models/User");
const bcrypt = require("bcrypt");

module.exports.resetDb = function () {
    this.deleteDb();
    db.exec(
        "CREATE TABLE IF NOT EXISTS user(ID INTEGER PRIMARY KEY, username varchar(50), email varchar(50), first_name varchar(50), last_name varchar(50), password CHAR(60), country varchar(50), date_of_birth date, twitch_token varchar(100)) "
    );
};

module.exports.deleteDb = function () {
    db.exec("DROP TABLE IF EXISTS user");
};

module.exports.addUser = async function (data) {
    // Assuming validation is done beforehand

    // Hashing password
    let user = new User(data);
    user.password = await bcrypt.hash(user.password, 10);

    // TODO: Check for duplicate username/email

    // Inserting
    let stmt = db.prepare(
        "INSERT INTO user(username, email, first_name, last_name, password, country, date_of_birth) VALUES(@username, @email, @first_name, @last_name, @password, @country, @date_of_birth)"
    );
    let info = stmt.run({
        username: user.username,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password: user.password,
        country: user.country,
        date_of_birth: user.dateOfBirth
    });

    return info.lastInsertRowid;
};

module.exports.getUserById = function (id) {
    let stmt = db.prepare("SELECT * FROM user WHERE id = ?");
    return stmt.get(id);
};

module.exports.getUserByEmail = function (email) {
    let stmt = db.prepare("SELECT * FROM user WHERE email = ?");
    return stmt.get(email);
};

module.exports.updateTwitchToken = function (user, token) {
    return db.prepare("UPDATE user SET twitch_token = ? WHERE id = ?").run(token, user.ID);
};
