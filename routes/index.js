const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const movie = require('./modules/movie')
const home = require('./modules/home')
const favorite = require('./modules/favorite')

router.use('/movies', movie)
router.use('/users', user)
router.use('/favorite', favorite)
router.use('/', home)
module.exports = router
