const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authmiddleware');
require('dotenv/config');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.db_connection;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


