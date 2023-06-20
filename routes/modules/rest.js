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
  const id = req.params.rest_id
  return Rest.findById(id)
    .lean()
    .then((rests) => res.render('show', { rests }))
    .catch(error => console.log(error))
    // const rests = Rest.find(
    //     rests => rest.id.toString() === req.params.rest_id
    // )
    // res.render('show', {restaurants: rests });
})

router.get('/:rest_id/edit', (req, res) => {
  const id = req.params.rest_id
  return Rest.findById(id)
    .lean()
    .then((rests) => res.render('edit', { rests }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const news = req.body
  console.log(news)
  Rest.create(news) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

router.put('/:rest_id', (req, res) => {
  const id = req.params.rest_id
  // const name = req.body.name_en

  const filter = { _id: id }
  const update = req.body
  Rest.findOneAndUpdate(filter, update)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

router.delete('/:rest_id', (req, res) => {
  const id = req.params.rest_id
  return Rest.findById(id)
    .then(rests => rests.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// /////////////////////////////////////////////////////////////
module.exports = router
