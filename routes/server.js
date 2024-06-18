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
const Emitter = require('events')

// Database connection

mongoose.connect(process.env.MONGO_CONNECTION_URL);

const connection = mongoose.connection;
connection.once('open', () => {
console.log('Database connected...');
}).on('error', (err) => {
console.log('Connection failed:', err);
});

app.use(flash());


// Session store
let mongoStore = MongoDbStore.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL,
    collectionName: 'sessions'
});
//Even emitter
 const eventEmitter = new Emitter()
 app.set('eventEmitter',)

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
app.use((req,res)=>{
    res.status(404).send('<h1>404,Page not found</h1>')
})

// Start Server
const server = app.listen(PORT, () => {
console.log(`Listening on port ${PORT}`);
});

//socket

const io = require('socket.io')(server)
io.on('connection',(socket)=>{
    // Join
    console.log(socket.id)
    socket.on('join',(orderId)=>{
       
        socket.join(orderId)

    })
})


eventEmitter.on('orderUpdated',(data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data)
})

eventEmitter.on('orderPlaced',()=>{
    io.to(adminRoom).emit('orderPlaced',data)
})

