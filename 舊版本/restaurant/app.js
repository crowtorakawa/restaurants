const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

// const restaurantData = require('./restaurant.json')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port,()=>{
    console.log(`Express is listening on http://localhost:${port}`)
})
