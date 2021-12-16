const express = require('express')
const router = express.Router()
const userController = require('../../controller/userController')
const passport = require('passport')
router.get('/register', userController.getRegister)
router.post('/register', userController.postRegister)
router.get('/logout', userController.getLogout)

module.exports = router
