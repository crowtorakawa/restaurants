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
  //  Rest.findById(id)
  //     .then(rest => {
  //         rest = req.body
  //         rest.name =req.body.name
  //         rest.name_en =req.body.name_en
  //         rest.category =req.body.category
  //         rest.image =req.body.image
  //         rest.location =req.body.location
  //         rest.phone =req.body.phone
  //         rest.google_map =req.body.google_map
  //         rest.rating =req.body.rating
  //         rest.description =req.body.description
  //         return rest.save()
  //     })
  //     .then(() => res.redirect(`/restaurants/${id}`))
  //     .catch(error => console.log(error))
})
// /////////////////////////////////////////////////////////////////// search
// router.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const keywords = req.query.keyword.toLowerCase().trim()
//   if (!keyword) {
//     return res.redirect('/')
//   }
//   console.log(keyword)
//   // const nameSearch = Rest.filter(rest=> {
//   //     return rest.name.includes(keyword)
//   // })
//   // let object = { ...categorySearch, ...nameSearch};
//   // console.log(object)
//   // return Rest.filter()
//   // .lean()
//   // .then((rests) => res.render('edit',{ rests }))
//   // .catch(error => console.log(error))

//   Rest.find()
//     .lean()
//     .then(rests => {
//       const filteredRestaurants = rests.filter(
//         ({ name, name_en, category }) =>
//           name.toLowerCase().includes(keyword) ||
//           name_en.toLowerCase().includes(keyword) ||
//               category.includes(keyword)
//       )
//       const object = filteredRestaurants.length === 0 ? '' : 'index'
//       return res.render(object, { rests: filteredRestaurants, keywords })
//     })
//     // res.render('index',{rests})
//     .catch(error => console.error(error))
//     // res.render('index', {rests: object })
// })

// app.get('/restaurants/new' , (req,res)=>{
//     return res.render('new')
// })
router.delete('/:rest_id', (req, res) => {
  const id = req.params.rest_id
  return Rest.findById(id)
    .then(rests => rests.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// /////////////////////////////////////////////////////////////
module.exports = router
