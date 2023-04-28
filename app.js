const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const User = require('./models/formuser')

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const app = express();
const cors = require('cors')
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findByPk(1)
  .then(user => {
    req.user = user;
    next()
  })
  .catch(err => {
    console.log(err)
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through: CartItem })
Product.belongsToMany (Cart,{through: CartItem })

sequelize
// .sync({force: true})
  .sync()
  .then(result => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user){
      return User.create({name:'Dipankar', email: 'dipankar@gmail.com'})
    }
    return user;
  })
  .then( user => {
    // console.log(user)
    return user.createCart()
    
  }).then( cart => {
    app.listen(7000);
  })
  .catch(err => {
    console.log(err)
  })






app.get('/user/add-users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


app.post('/user/add-users', async (req, res, next) => {
  try {
    console.log(req.body);

    if (!req.body.phonenumber) { // corrected here
      throw new Error('Phone Number Mandatory');
    }

    const { name, email, phonenumber } = req.body;

    const data = await User.create({
      name,
      email,
      phonenumber,
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


app.delete('/user/delete-user/:id', async (req, res, next) => {
  const userId = req.params.id;
  User.findByPk(userId)
    .then(user => {
      user.destroy()
    })
    .then(result => {
      console.log('Deleted')
    })
    .catch(e => console.log(e))
})

// sequelize.sync()
//   .then(
//     app.listen(3000)
//   )
//   .catch(err => {
//     console.log(err)
//   })

