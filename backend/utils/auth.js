const jwt = require('jsonwebtoken');
const dao = require('../dao');

// TODO: Look into writing this better
let Auth;
module.exports = Auth = {};

Auth.generateJwtToken = async function (user) {
    let token;

    try {
        let payload = {
            id: user.ID
        };

        token = jwt.sign(payload, Buffer.from(process.env.JWT_SECRET_BASE64, 'base64'), {
            expiresIn: "7d"
        });
    } catch (error) {
        console.log(error);
    }

    return token;
}

Auth.verifyToken = async (token) => jwt.verify(token, Buffer.from(process.env.JWT_SECRET_BASE64, 'base64'));

Auth.getUserFromRequest = async function (req) {
    let token = req.headers['authorization'] || req.headers['Authorization'];
    if (!token) {return null;}

    token = token.replace("Bearer ", '');
    let user;
    try {
        let data = await Auth.verifyToken(token);
        user = dao.getUserById(data.id);
    } catch (error) {
        console.error(`Error getting user from JWT:\n${error.name}: ${error.message}`);
    }

    return user;
}