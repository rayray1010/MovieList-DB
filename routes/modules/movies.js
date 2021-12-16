const express = require('express')
const router = express.Router()
const movieController = require('../../controller/movieController')
router.get('/', movieController.getMovies)
router.get('/favorite', movieController.getFavoriteMovies)
router.post('/favorite/:id', movieController.postFavoriteMovie)
router.delete('/favorite/:id', movieController.deleteFavoriteMovie)
router.get('/:id', movieController.getMovie)
module.exports = router
