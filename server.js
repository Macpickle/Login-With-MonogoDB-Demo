require('dotenv').config(); // Load environment variables from .env file

// Initialize express router
const express = require('express');
const app = express();
const flash = require('express-flash');
const session = require('express-session'); // Import the express-session package
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

// Set up mongoose connection, use your own database URL in .env file
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

app.use(passport.initialize());

// Set up express app
app.use(express.json());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
})); // make your own secrect key in .env file

// view ports (styling)
app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'src')));

// main route
var index = require('./routes/login');
app.use('/', index);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});