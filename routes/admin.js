
const express = require('express');

const router = express.Router();


router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">SIZE</button><button type="submit">ADD PRODUCT</button></form>');
});


router.post('/product',(req,res,next)=>{
    console.log(req.body.title)
    console.log(req.body.size)
    res.redirect('/')
});


module.exports = routes;