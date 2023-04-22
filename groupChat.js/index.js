const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Set up session middleware
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  // Get the username from the session
  const username = req.session.username || 'Guest';

  fs.readFile('username.text', (err, data) => {
    if (err) {
      console.log(err);
      data = "NO CHAT EXIST"
    }

    // Add the username to the chat form
    res.send(`${data}<form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action="/" method="POST">
              <input type="text" name="message" id="message">
              <input type="hidden" name ="username" id="username" value="${username}">
              <button type="submit">SEND</button>
            </form>`);
  });
});

app.post('/', (req, res, next) => {
  const { username, message } = req.body;

  fs.writeFile('username.text', `${username}:${message}\n`, { flag: 'a' }, (err) => {
    if (err) {
      console.log(err);
    }
  });

  // Redirect back to the root route
  res.redirect('/');
});

app.get('/login', (req, res, next) => {
  res.send(`<form action="/login" method="POST">
              <input type="text" name="username" placeholder="Enter your username">
              <button type="submit">Login</button>
            </form>`);
});

app.post('/login', (req, res, next) => {
  const { username } = req.body;

  // Set the username in the session
  req.session.username = username;

  // Redirect back to the root route
  res.redirect('/');
});

app.use((req, res, next) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

app.listen(7000);
