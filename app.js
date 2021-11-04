const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const route = require('./routes/index')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const usePassport = require('./config/passport')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: 'This is my secret',
    resave: false,
    saveUninitialized: true,
  })
)
usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(route)

app.listen(3000, () => {
  console.log('server running')
})
