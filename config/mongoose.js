const mongoose = require('mongoose')

// //////////////////////////////////////////////////////
// 加入這段 code, 僅在非正式環境時, 使用 dotenv      順序
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// ////////////////////////////////////////////////////////
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
module.exports = db
