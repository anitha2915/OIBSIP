const express = require('express');
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(expressLayout);

// Set Template Engine
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cart', (req, res) => {
    res.render('customers/cart');
});

app.get('/login', (req, res) => {
    res.render('auth/login');
});

app.get('/register', (req, res) => {
    res.render('auth/register');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

