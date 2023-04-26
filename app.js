const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user')

//const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const app = express();
const cors = require('cors')
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

sequelize.sync()
.then(result =>{
    // console.log(result);
    // app.listen(7000);
})
.catch(err => {
    console.log(err)
})

app.post('/user/add-user', async (req, res, next) => {
    try {
      console.log(req.body);
  
      if (!req.body.phoneNumber) {
        throw new Error('Phone Number Mandatory');
      }
  
      const { name, email, phoneNumber } = req.body;
  
      const data = await User.create({
        name,
        email,
        phoneNumber,
      });
  
      res.status(201).json({ newUserDetail: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message,
      });
    }
  });
  

  app.get('/user/get-users', async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ allUsers: users });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
  

app.delete('/user/delete-user/:id', async (req,res,next)=>{
    const userId = req.params.id;
    User.findByPk(userId)
    .then(user=>{
      user.destroy()
    })
    .then(result=>{
      console.log('Deleted')
    })
    .catch(e=>console.log(e))
})

sequelize.sync()
.then(
    app.listen(3000)
)
.catch(err=>{
    console.log(err)
})

