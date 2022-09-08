const { verifyToken } = require('../utils/token');
const { findUserByUsername } = require('../models/user');

const auth = async (req, res,next) => {
   
    const [_, token] = req.get('authentication').split(' ');
   
    try {
   
        const decoded = verifyToken(token);
        const user = await findUserByUsername(decoded.username);
        req.user = user;
        
    } catch (error) {
        //console.log({error});
        return res.status(500).json({error: 'Auth Error'});
    }
    next();
};
module.exports = {auth};