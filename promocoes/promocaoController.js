const express = require('express')
const router = express.Router()

// const category = require('./category')
const slugify = require('slugify');

var InvalidArgument = false;

function clearText(text){
    if(text.trim() != '' && length(text) > 3){
        return true
    }
}

router.get('/requerimentos/promover', (req, res) => {

    res.render('requerimentos/promocao', {
        InvalidArgument: InvalidArgument
    })
})

router.post('/requerimentos/save', (req, res) => {
    var title = req.body.title
    if(clearText(title)){
        category.create({
            title: title,
            slug : slugify(title)
        }).then(() => {
            InvalidArgument = false
            res.redirect('/')
        })
    }else{

        res.redirect('/requerimentos/promover')

        InvalidArgument = true
    }
}) 

router.get('/admin/categories', (req, res) => {

    category.findAll().then((categories => {
        res.render('admin/categories/index', {categories: categories})
    }))
})

module.exports = router