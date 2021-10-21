const express = require('express')
const router = express.Router()
const autorizado = require('../middlewares/login')

router.get('/articles', autorizado, (req, res) => {
    res.send('Hello World!')
})

router.get('/admin/articles/new', autorizado, (req, res) => {
    res.send('Hello World!')
})

module.exports = router