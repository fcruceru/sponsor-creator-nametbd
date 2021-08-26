const db = require("better-sqlite3")(__dirname + "/sqlite.db");
const Creator = require("./models/Creator");
const Sponsor = require("./models/Sponsor");
const bcrypt = require("bcrypt");

module.exports.resetDb = function () {
    // Delete current tables
    this.deleteDb();
    // Add creator table
    db.exec(
        "CREATE TABLE IF NOT EXISTS creator(ID INTEGER PRIMARY KEY, username varchar(50), email varchar(50), first_name varchar(50), last_name varchar(50), password CHAR(60), country varchar(50), date_of_birth text, twitch_token text, twitch_metrics text, rank text, state text)"
    );
    // Add sponsor table
    db.exec(
        "CREATE TABLE IF NOT EXISTS creator(ID INTEGER PRIMARY KEY, email varchar(50), first_name varchar(50), last_name varchar(50), password CHAR(60), country varchar(50), state text, company_name varchar(50), products text, phone_number varchar(50))"
    );
};

module.exports.deleteDb = function () {
    db.exec("DROP TABLE IF EXISTS creator");
    db.exec("DROP TABLE IF EXISTS sponsor");
};

module.exports.addCreator = async function (data) {
    // Assuming validation is done beforehand

    // Hashing password
    let creator = new Creator(data);
    creator.password = await bcrypt.hash(creator.password, 10);

    // TODO: Check for duplicate username/email

    // Inserting
    let stmt = db.prepare(
        "INSERT INTO creator(username, email, first_name, last_name, password, country, date_of_birth, rank, state) VALUES(@username, @email, @first_name, @last_name, @password, @country, @date_of_birth, @rank, @state)"
    );
    let info = stmt.run({
        username: creator.username,
        email: creator.email,
        first_name: creator.first_name,
        last_name: creator.last_name,
        password: creator.password,
        country: creator.country,
        date_of_birth: creator.date_of_birth,
        rank: Creator.CREATOR_RANKS.NORMAL,
        state: Creator.CREATOR_STATES.ACTIVE
    });

    return info.lastInsertRowid;
};

module.exports.addSponsor = async function (data) {
    // Assuming validation is done beforehand

    // Hashing password
    let sponsor = new Sponsor(data);
    sponsor.password = await bcrypt.hash(sponsor.password, 10);

    // TODO: Check for duplicate username/email

    // Inserting
    let stmt = db.prepare(
        "INSERT INTO sponsor(email, first_name, last_name, password, country, state, products, company_name, phone_number) VALUES(@username, @email, @first_name, @last_name, @password, @country, @date_of_birth, @rank, @state, @company_name, @products, @phone_number)"
    );
    let info = stmt.run({
        email: sponsor.email,
        first_name: sponsor.first_name,
        last_name: sponsor.last_name,
        password: sponsor.password,
        country: sponsor.country,
        state: Sponsor.SPONSOR_STATES.PENDING_APPROVAL,
        products: sponsor.products,
        company_name: sponsor.company_name,
        phone_number: sponsor.phone_number
    });

    return info.lastInsertRowid;
};

module.exports.getUserById = function (type, id) {
    let stmt = db.prepare(`SELECT * FROM ${type} WHERE id = ?`);
    let data = stmt.get(id);

    if (type == "creator") {
        data.twitch_token = JSON.parse(data.twitch_token);
        data.twitch_metrics = JSON.parse(data.twitch_metrics);
        return new Creator(data);
    } else if (type == "sponsor") {
        return new Sponsor(data);
    }

    return null;
};

module.exports.getUserByEmail = function (type, email) {
    let stmt = db.prepare(`SELECT * FROM ${type} WHERE email = ?`);
    let data = stmt.get(email);

    if (type == "creator") {
        data.twitch_token = JSON.parse(data.twitch_token);
        data.twitch_metrics = JSON.parse(data.twitch_metrics);
        return new Creator(data);
    } else if (type == "sponsor") {
        return new Sponsor(data);
    }

    return null;
};

module.exports.updateTwitchToken = function (creator, token) {
    return db.prepare("UPDATE creator SET twitch_token = ? WHERE id = ?").run(JSON.stringify(token), creator.ID);
};

module.exports.updateTwitchMetrics = function (creator, metrics) {
    return db.prepare("UPDATE creator SET twitch_metrics = ? WHERE id = ?").run(JSON.stringify(metrics), creator.ID);
};
