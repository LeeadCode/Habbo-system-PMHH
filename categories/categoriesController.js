const express = require('express')
const router = express.Router()
const category = require('./category')
const slugify = require('slugify');

var InvalidArgument = false;

function clearText(text){
    if(text.trim() != '' && text.length > 3){
        return true
    }
}

router.get('/admin/categories/new', (req, res) => {

    res.render('admin/categories/new', {
        InvalidArgument: InvalidArgument
    })
})

router.post('/categories/save', (req, res) => {
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

        res.redirect('/admin/categories/new')

        InvalidArgument = true
    }
}) 

router.get('/admin/categories', (req, res) => {

    category.findAll().then((categories => {
        res.render('admin/categories/index', {categories: categories})
    }))
})

router.post('admin/categories/delete', (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            category.destroy({
                where: {
                    id: id
                } 
            }).then(()=>{
                res.redirect('/admin/categories')
            })
        }else{
            res.redirect('/admin/categories')
        }
    }else{
        res.redirect('/admin/categories')
    }
})

module.exports = router