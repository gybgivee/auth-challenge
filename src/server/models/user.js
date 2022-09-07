const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getErrorCode } = require('../utils/errorCode');
const {
    getHashPassword
} = require('../utils/hashing');

const queryUserByUSername = async (username) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
               username
            }
        });

        return { status: 200, data: { user },token };

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "user");
    }

}
const createUser = async (user) => {
    const { username, password } = user;
    const hashedPassword = await getHashPassword(password);
    console.log({hashedPassword});
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        return { status: 201, data: { user } }
    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "user");
    }
}
module.exports = {
    queryUserByUSername,
    createUser
}