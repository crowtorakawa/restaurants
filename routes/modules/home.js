const express = require('express')
const router = express.Router()
// 引用 Express 與 Express 路由器
const Rest = require('../../models/restaurants')
// 引用 餐廳的 model
const sortMethod = [{ _id: 'asc' }, { name: 'asc' }, { name: 'desc' }, { category: 'asc' }, { rating: 'desc' }, { rating: 'asc' }
]

router.get('/', (req, res) => {
  const userId = req.user._id
  Rest.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(rests => {
      res.render('index', { rests })
    })
    .catch(error => console.error(error))
})
// 首頁路由
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keywords = req.query.keyword.toLowerCase().trim()
  const sort = req.query.sort
  const userId = req.user._id
  if (!keyword) {
    return res.redirect('/')
  }
  Rest.find({ userId })
    .lean()
    .sort(sortMethod[sort])
    .then(rests => {
      const filteredRestaurants = rests.filter(
        ({ name, name_en, category }) =>
          name.toLowerCase().includes(keyword) ||
          name_en.toLowerCase().includes(keyword) ||
              category.includes(keyword)
      )
      const object = filteredRestaurants.length === 0 ? '' : 'index'
      return res.render(object, { rests: filteredRestaurants, keywords })
    })
    // res.render('index',{rests})
    .catch(error => console.error(error))
    // res.render('index', {rests: object })
})
module.exports = router
