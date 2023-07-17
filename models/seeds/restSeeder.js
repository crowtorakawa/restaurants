const jsonData = require('../../restaurant.json')

const restaurants = require('../restaurants')

const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i in jsonData.results) {
    restaurants.create({
      name: `${jsonData.results[i].name}`,
      name_en: `${jsonData.results[i].name_en}`,
      category: `${jsonData.results[i].category}`,
      image: `${jsonData.results[i].image}`,
      location: `${jsonData.results[i].location}`,
      phone: `${jsonData.results[i].phone}`,
      google_map: `${jsonData.results[i].google_map}`,
      rating: `${jsonData.results[i].rating}`,
      description: `${jsonData.results[i].description}`
    })
  }
  console.log('mongodb connected!')
})
