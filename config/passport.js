const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          let user = await User.findOne({ where: { email } })
          if (!user) {
            req.flash('warning_msg', 'This email is not registered!')
            return done(null, false, {
              message: 'Email or Password incorrect.'
            })
          }
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
            req.flash('warning_msg', 'wrong Email or password.')
            return done(null, false)
          }
          return done(null, user)
        } catch (err) {
          return done(err, false)
        }
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findByPk(id)
      user = user.toJSON()
      done(null, user)
    } catch (err) {
      return done(err, null)
    }
  })
}
