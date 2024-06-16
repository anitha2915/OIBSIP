require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const passport = require('passport');

// Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url);

const connection = mongoose.connection;
connection.once('open', () => {
console.log('Database connected...');
}).on('error', (err) => {
console.log('Connection failed:', err);
});

app.use(flash());


// Session store
let mongoStore = MongoDbStore.create({
mongoUrl: url,
collectionName: 'sessions'
});

// Session config
app.use(session({
secret: process.env.COOKIE_SECRET,
resave: false,
store: mongoStore,
saveUninitialized: false,
cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

//Passport config
const passportInit = require('../app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req,res,next)=>{
res.locals.session=req.session
res.locals.user = req.user
next()
})
app.use(expressLayouts);

// Set Template Engine
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'ejs');

// Routes
require('./web')(app);

// Start Server
app.listen(PORT, () => {
console.log(`Listening on port ${PORT}`);
});

