const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  let errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填的！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  }
  try {
    const user = await User.findOne({ where: { email } })
    if (user) {
      errors.push({ message: '這個 Email 已註冊過！' })
      console.log('User already exists')
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    }
    const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    newUser = await User.create({ name, email, password: hash })
    req.login(newUser, (result) => {
      return res.redirect('/')
    })
    // res.redirect('/users/login')
  } catch (err) {
    console.log(err)
  }
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已成功登出！')
  res.redirect('/')
})

module.exports = router
