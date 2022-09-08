const { verifyToken } = require('../utils/token');
const { queryUserByusername } = require('../models/user');

const auth = async (req, res, next) => {

    if (req.method === 'POST') {

        try {
            const getToken = req.get('authorization');
            const [_, token] = getToken ? getToken.split(' ') : '';
            //const token = req.get('authentication');
            console.log('token in auth', token);
            const decoded = verifyToken(token);
            console.log({ decoded });
            const user = await queryUserByusername(decoded);
            console.log(user);
            req.user = user.data.user;

            console.log(req.user.data);
        } catch (error) {
            console.log({ error });
            return res.status(500).json({ error: 'Auth Error' });
        }
    }
    next();
};
module.exports = { auth };