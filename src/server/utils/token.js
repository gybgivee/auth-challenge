const jwt = require('jsonwebtoken');
const mysecret = process.env.JWT_SECRET;

const createToken = (payload, secret = mysecret) => {
    return jwt.sign(payload, secret);
}
const verifyToken = (token, secret = mysecret) => {
    return jwt.verify(token, secret)
}
module.exports = {
    createToken,
    verifyToken,
};