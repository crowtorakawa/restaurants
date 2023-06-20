const port = 3000
const express = require('express')
// const restaurants = require('./restaurant.json') 原json檔案

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyparser = require('body-parser')

const app = express()
const routes = require('./routes')
require('./config/mongoose')
// DataBase connect
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)
app.listen(port, () => {
  console.log('Express is listening on http://localhost:3000')
})
