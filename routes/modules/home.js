const express = require('express')
const router = express.Router()
// 引用 Express 與 Express 路由器
const Rest = require('../../models/restaurants')
// 引用 餐廳的 model
const sortMethod = [{ _id: 'asc' }, { name: 'asc' }, { name: 'desc' }, { category: 'asc' }, { rating: 'desc' }, { rating: 'asc' }]

router.get('/', (req, res) => {
  Rest.find()
    .lean()
    .sort({ name: 'asc' })
    .then(rests => res.render('index', { rests }))
    .catch(error => console.error(error))
    // res.render('index',{restaurants: restaurants.results})
})
// 首頁路由
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keywords = req.query.keyword.toLowerCase().trim()
  const sort = req.query.sort
  if (!keyword) {
    return res.redirect('/')
  }
  console.log(keyword)
  console.log(sort)
  // const nameSearch = Rest.filter(rest=> {
  //     return rest.name.includes(keyword)
  // })
  // let object = { ...categorySearch, ...nameSearch};
  // console.log(object)
  // return Rest.filter()
  // .lean()
  // .then((rests) => res.render('edit',{ rests }))
  // .catch(error => console.log(error))

  Rest.find()
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
