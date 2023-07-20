// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組

// 引入 模組程式碼
const home = require('./modules/home')
const rest = require('./modules/rest')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth') // 掛載 middleware
// 將網址結構符合 / 字串的 request 導向模組
router.use('/restaurants', authenticator, rest)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
