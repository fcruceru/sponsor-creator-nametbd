const jwt = require('jsonwebtoken');

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