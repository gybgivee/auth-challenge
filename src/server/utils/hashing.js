const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHashPassword = async(password)=>{
    return await bcrypt.hash(password, saltRounds);
}
const isPasswordMatch = async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);
}
module.exports = {
 getHashPassword,
 isPasswordMatch
}