const jsonData = require('../../restaurant.json')

const bcrypt = require('bcryptjs')
const restaurants = require('../restaurants')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = require('./userTable.json') // 建立user表

db.once('open', () => {
  // 利用map 建立 user seed
  const returnSeed = SEED_USER.map(userSeed => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(userSeed.password, salt))
      .then(hash => User.create({
        name: userSeed.name,
        email: userSeed.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => restaurants.create({
            name: jsonData.results[userSeed.RestaurantNum[i]].name,
            name_en: jsonData.results[userSeed.RestaurantNum[i]].name_en,
            category: jsonData.results[userSeed.RestaurantNum[i]].category,
            image: jsonData.results[userSeed.RestaurantNum[i]].image,
            location: jsonData.results[userSeed.RestaurantNum[i]].location,
            phone: jsonData.results[userSeed.RestaurantNum[i]].phone,
            google_map: jsonData.results[userSeed.RestaurantNum[i]].google_map,
            rating: jsonData.results[userSeed.RestaurantNum[i]].rating,
            description: jsonData.results[userSeed.RestaurantNum[i]].description,
            userId
          })
        ))
      })
      .then(() => {
        console.log(userSeed.name, '...ok')
      })
      .catch(err => console.log(err))
  })

  Promise.all(returnSeed)
    .then(() => {
      console.log('...done')
      process.exit()
    })
    .catch(err => console.log(err))
})
