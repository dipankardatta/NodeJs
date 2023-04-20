const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    fs.readFile('username.text',(err,data)=>{
        if(err){
            console.log(err);
            data = "NO CHAT EXIST"
        }
        res.send(`${data}<form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action="/" method="POST"><input type="text" name="message" id="message"><input type="hidden" name ="username" id="username"><button type="submit">SEND</button></form>`);
    })
    
})

app.post('/', (req, res, next) => {
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.text",`${req.body.username}:${req.body.message}\n`,{flag:'a'},(err)=>{
        err ? console.log(err) : res.redirect('/')
    });
    
});

app.get('/login', (req, res, next) => {
    res.send('<form onsubmit=" document.getElementById(`username`).value=localStorage.setItem(`username`)" action="/login" method="POST"><input id="username" type="text" name"title"><button type="submit">add</button></form>');
});

app.use((req, res, next) => {
    res.status(404).send("<h1>PAGE NOT FOUND</h1>")
})

app.listen(7000);
