const db = require("better-sqlite3")(__dirname + "/sqlite.db");
const User = require("./models/User");
const bcrypt = require("bcrypt");

module.exports.resetDb = function () {
    this.deleteDb();
    // TODO: Change twitch metrics to individual properties
    db.exec(
        "CREATE TABLE IF NOT EXISTS user(ID INTEGER PRIMARY KEY, username varchar(50), email varchar(50), first_name varchar(50), last_name varchar(50), password CHAR(60), country varchar(50), date_of_birth text, twitch_token text, twitch_metrics text, rank text, state text, product_name text, phone_number text) "
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
        "INSERT INTO user(username, email, first_name, last_name, password, country, date_of_birth, rank, state, product_name, phone_number) VALUES(@username, @email, @first_name, @last_name, @password, @country, @date_of_birth, @rank, @state, @product_name, @phone_number)"
    );
    let info = stmt.run({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
        country: user.country,
        date_of_birth: user.date_of_birth,
        rank: user.rank,
        state: user.state,
        product_name: user.product_name,
        phone_number: user.phone_number
    });

    return info.lastInsertRowid;
};

module.exports.getUserById = function (id) {
    let stmt = db.prepare("SELECT * FROM user WHERE id = ?");
    let data = stmt.get(id);
    data.twitch_token = JSON.parse(data.twitch_token);
    data.twitch_metrics = JSON.parse(data.twitch_metrics);

    return new User(data);
};

module.exports.getUserByEmail = function (email) {
    let stmt = db.prepare("SELECT * FROM user WHERE email = ?");
    let data = stmt.get(email);
    data.twitch_token = JSON.parse(data.twitch_token);
    data.twitch_metrics = JSON.parse(data.twitch_metrics);

    return new User(data);
};

module.exports.updateTwitchToken = function (user, token) {
    return db.prepare("UPDATE user SET twitch_token = ? WHERE id = ?").run(JSON.stringify(token), user.ID);
};

module.exports.updateTwitchMetrics = function (user, metrics) {
    return db.prepare("UPDATE user SET twitch_metrics = ? WHERE id = ?").run(JSON.stringify(metrics), user.ID);
};
