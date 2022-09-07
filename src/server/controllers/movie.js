const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecret';


const getAllMovies = async (req, res, next) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res, next) => {
    const { title, description, runtimeMins } = req.body;

    try {
        const token = null;
        // todo verify the token
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = null;

    res.json({ data: createdMovie });
};

module.exports = {
    getAllMovies,
    createMovie
};