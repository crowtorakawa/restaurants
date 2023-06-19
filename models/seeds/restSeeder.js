const express = require('express')
const mongoose = require('mongoose')//
const port = 3000

const jsonData = require('../../restaurant.json')

const restaurants = require('../restaurants')

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
// const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// const exphbs = require('express-handlebars')
const db  = mongoose.connection
db.on('error',()=>{
    console.log('mongodb error')
})
db.once('open',()=>{
    for(var i in jsonData.results){
        restaurants.create({
            
            name:`${jsonData.results[i].name}`,
            name_en: `${jsonData.results[i].name_en}`,
            category:`${jsonData.results[i].category}`,
            image:`${jsonData.results[i].image}`,
            location:`${jsonData.results[i].location}`,
            phone:`${jsonData.results[i].phone}`,
            google_map:`${jsonData.results[i].google_map}`,
            rating:`${jsonData.results[i].rating}`,
            description:`${jsonData.results[i].description}`
        })
    }
    console.log('mongodb connected!')
})