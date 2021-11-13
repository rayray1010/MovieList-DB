const express = require('express')
const router = express.Router()
const db = require('../../models')
const axios = require('axios')
const User = db.User

router.get('/', (req, res) => {
  res.render('comment')
})

router.get('/new', async (req, res) => {})

module.exports = router
