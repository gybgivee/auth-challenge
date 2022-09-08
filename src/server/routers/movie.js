const express = require('express');
const {
    getAllMovies,
    setMovie
} = require('../controllers/movie');

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', setMovie);

module.exports = router;