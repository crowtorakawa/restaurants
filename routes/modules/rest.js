const express = require('express')
const router = express.Router()
// 引用 Express 與 Express 路由器
const Rest = require('../../models/restaurants')
// 引用 餐廳的 model

// ////////////////////////////////////////////////////////////
router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:rest_id', (req, res) => {
  console.log(req.params.rest_id)
  const _id = req.params.rest_id
  const userId = req.user._id

  return Rest.findOne({ _id, userId })
    .lean()
    .then(rests => {
      console.log(rests)
      res.render('show', { rests })
    })
    .catch(error => console.log(error))
    // const rests = Rest.find(
    //     rests => rest.id.toString() === req.params.rest_id
    // )
    // res.render('show', {restaurants: rests });
})

router.get('/:rest_id/edit', (req, res) => {
  const _id = req.params.rest_id
  const userId = req.user._id

  return Rest.findOne({ _id, userId })
    .lean()
    .then((rests) => res.render('edit', { rests }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user._id
  // news['userId'] = userId
  // console.log(news)
  return Rest.create({ name, name_en, category, image, location,phone, google_map, rating, description, userId }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

router.put('/:rest_id', (req, res) => {
  const _id = req.params.rest_id
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Rest.findOne({ _id, userId })
    .then(rests => {
      rests.name = name
      rests.name_en = name_en
      rests.category = category
      rests.image = image
      rests.location = location
      rests.phone = phone
      rests.google_map = google_map
      rests.rating = rating
      rests.description = description
      return rests.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
//   Rest.findOneAndUpdate({ _id, update, userId })
//     .then(() => res.redirect(`/restaurants/${_id}`))
//     .catch(err => console.log(err))
// })
})

router.delete('/:rest_id', (req, res) => {
  const _id = req.params.rest_id
  const userId = req.user._id

  return Rest.findById({ _id, userId })
    .then(rests => rests.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// /////////////////////////////////////////////////////////////
module.exports = router
