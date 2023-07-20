const jsonData = require('../../restaurant.json')

const bcrypt = require('bcryptjs')
const restaurants = require('../restaurants')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: jsonData.results.length },
        (_, i) =>
          restaurants.create({
            name: `${jsonData.results[i].name}`,
            name_en: `${jsonData.results[i].name_en}`,
            category: `${jsonData.results[i].category}`,
            image: `${jsonData.results[i].image}`,
            location: `${jsonData.results[i].location}`,
            phone: `${jsonData.results[i].phone}`,
            google_map: `${jsonData.results[i].google_map}`,
            rating: `${jsonData.results[i].rating}`,
            description: `${jsonData.results[i].description}`,
            userId
          })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
