const jwt = require("jsonwebtoken");
const dao = require("../dao");

// TODO: Look into writing this better
let Auth;
module.exports = Auth = {};

Auth.generateJwtToken = async function (user, type) {
    let token;

    try {
        let payload = {
            id: user.ID,
            type: type
        };

        token = jwt.sign(payload, Buffer.from("dGVzdF9iYXNlNjQ=", "base64"), { // TODO: Fix env variable
            expiresIn: "7d"
        });
    } catch (error) {
        console.error(error);
    }

    return token;
};

Auth.verifyToken = async (token) => jwt.verify(token, Buffer.from("dGVzdF9iYXNlNjQ=", "base64")); // TODO: Fix env variable

Auth.getUserFromRequest = async function (req) {
    let token = req.headers["authorization"] || req.headers["Authorization"];
    if (!token) {
        return null;
    }

    token = token.replace("Bearer ", "");
    let user;
    try {
        let data = await Auth.verifyToken(token);
        user = dao.getUserById(req.query.type, data.id);
    } catch (error) {
        console.error(`Error getting user from JWT:\n${error.name}: ${error.message}`);
    }

    return user;
};
