const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">SIZE</button><button type="submit">ADD PRODUCT</button></form>');
});


app.use('/product',(req,res,next)=>{
    console.log(req.body.title)
    console.log(req.body.size)
    res.redirect('/')
})



app.use('/',(req,res,next)=>{
    res.send('<h1>Hello from Express JS</h1>')
})

app.listen(4000)