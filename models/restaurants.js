const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantsSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: {
    type: String // 資料型別是字串
  },
  category: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  image: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  location: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  phone: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  google_map: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  rating: {
    type: Number, // 資料型別是數字
    required: true // 這是個必填欄位
  },
  description: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  userId: { // 加入關聯帳號id
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Rest', restaurantsSchema)
