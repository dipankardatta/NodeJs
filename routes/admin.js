
const express = require('express');
const path = require('path');
const {rootDir} = require('../util/path')
const router = express.Router();


router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','add-product.html'))
});


router.post('/product',(req,res,next)=>{
    console.log(req.body.title)
    console.log(req.body.size)
    res.redirect('/')
});


module.exports = router;