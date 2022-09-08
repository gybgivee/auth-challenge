const {
    createToken,
    verifyToken,
} = require("../utils/token");

const {
    createMovie,
    queryAllMovies
} = require('../models/movie');

const getAllMovies = async (req, res,next) => {
    const movies = await queryAllMovies();
    const { status, data } = movies;
console.log({movies});
    res.status(status).json({ data });
};

const setMovie = async (req, res, next) => {
    const { title, description, runtimeMins } = req.body;
console.log(req);
    if (!title || !description || runtimeMins === undefined || null) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    try {
        if (req.user.role === 'ADMIN') {
            const movie = await createMovie(req.body);

            return res.status(201).json({movie})
        }

        res.status(400).json({ error: 'Permission Denied.' })
        // todo verify the token
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: 'Invalid token provided.' })
    }
   
};

module.exports = {
    getAllMovies,
    setMovie
};