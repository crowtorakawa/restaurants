const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: { // 使用者姓名
    type: String,
    required: false
  },
  email: { // 使用者email
    type: String,
    required: true
  },
  password: { // 使用者password
    type: String,
    required: true
  },
  createdAt: { // 建立時間
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('User', userSchema)
