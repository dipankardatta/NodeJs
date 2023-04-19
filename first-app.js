

const express = require('express')

const app = express();

app.use((req,res,next)=>{
    console.log('In the Middleware');
    next();
});

app.use((req,res,next)=>{
    console.log('In another MIddleware');
    res.send('<h1>Hello from Express JS</h1>')
})

app.listen(4000)