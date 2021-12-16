const db = require('../models')
const User = db.User
const Favorite = db.Favorite
const axios = require('axios')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const userController = {
  getLogin: (req, res) => {
    return res.render('login')
  },
  postLogin: async (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/movies')
  },
  getRegister: (req, res) => {
    res.render('register')
  },
  postRegister: async (req, res) => {
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
        confirmPassword
      })
    }
    try {
      const user = await User.findOne({ where: { email } })
      if (user) {
        errors.push({ message: '這個 Email 已註冊過！' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      newUser = await User.create({ name, email, password: hash })
      req.login(newUser, result => {
        return res.redirect('/')
      })
    } catch (err) {
      console.log(err)
    }
  },
  getLogout: async (req, res) => {
    req.logout()
    req.flash('success_msg', '已成功登出！')
    res.redirect('/users/login')
  }
}

module.exports = userController
