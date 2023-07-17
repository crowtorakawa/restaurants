const port = 3000
const express = require('express')
// const restaurants = require('./restaurant.json') 原json檔案
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyparser = require('body-parser')

const app = express()
const routes = require('./routes')
const usePassport = require('./config/passport')

require('./config/mongoose')
// DataBase connect
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('public'))

usePassport(app)
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)
app.listen(port, () => {
  console.log('Express is listening on http://localhost:3000')
})
