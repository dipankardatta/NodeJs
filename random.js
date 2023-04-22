const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Serve the login form
app.get('/login', (req, res, next) => {
  res.send(`
    <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="GET">
      <input id="username" type="text" name="username" title="username">
      <button type="submit">Login</button>
    </form>
  `);
});

// Serve the message sending form
app.get('/', (req, res, next) => {
  const username = req.query.username || localStorage.getItem('username');
  if (!username) {
    res.redirect('/login');
    return;
  }

  res.send(`
    <h3>Welcome, ${username}</h3>
    <form action="/" method="POST">
      <input type="text" name="message" placeholder="message">
      <input type="hidden" name="username" value="${username}">
      <button type="submit">Send</button>
    </form>
  `);
});

// Save the message to file and redirect back to the message sending form
app.post('/', (req, res, next) => {
  const { username, message } = req.body;
  const data = `${username}: ${message}\n`;
  fs.appendFile('messages.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving message');
      return;
    }
    res.redirect('/');
  });
});

// Serve the messages from file
app.get('/messages', (req, res, next) => {
  fs.readFile('messages.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading messages');
      return;
    }
    const messages = data.split('\n').filter(Boolean).map(line => {
      const [username, message] = line.split(':');
      return `<li><strong>${username}</strong>: ${message.trim()}</li>`;
    });
    res.send(`<ul>${messages.join('')}</ul>`);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 7000');
});
