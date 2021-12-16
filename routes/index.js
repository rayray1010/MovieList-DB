const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const passport = require('passport')
const movieController = require('../controller/movieController')
const userController = require('../controller/userController')
const users = require('./modules/users1')
const movies = require('./modules/movies')
router.get('/', (req, res) => {
  return res.redirect('/movies')
})
router.get('/users/login', userController.getLogin)
router.post(
  '/users/login',
  passport.authenticate('local', {
    successRedirect: '/movies',
    failureRedirect: '/users/login'
  }),
  userController.postLogin
)
router.get('/users/register', userController.getRegister)
router.post('/users/register', userController.postRegister)
router.get('/users/logout', userController.getLogout)
router.use('/movies', authenticator, movies)
module.exports = router
