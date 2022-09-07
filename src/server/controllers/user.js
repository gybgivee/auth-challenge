const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
//const jwtSecret = 'mysecret';
const {
    createUser,
    queryUserByUSername
} = require('../models/user');
const {
    isPasswordMatch
} = require('../utils/hashing');
const { createToken } = require('../utils/token');
const register = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    const user = await createUser(req.body);
    const { status, data } = user;

    return res.status(status).json({ data });
};

const login = async (req, res, next) => {
    const { username, password } = req.body;

    const foundUser = await queryUserByUSername(username);
    const { status, data } = foundUser;
    if (!data) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordsMatch = await isPasswordMatch(password,);

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = createToken(username);
    localStorage.setItem('authentication', token);

    return res.status(status).json({ data });
};

module.exports = {
    register,
    login
};