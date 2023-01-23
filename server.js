if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const session = require('express-session')
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require("method-override")
const admin = require('./models/admin')
const User = require('./models/user')
const flash = require("express-flash")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const app = express()
const MongoStore = require('connect-mongo')
const connectEnsureLogin = require('connect-ensure-login');// authorization


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// Configure Sessions Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  store: new MongoStore({ mongoUrl: process.env.DATABASE_URL })
}));

app.use(flash());

const userStrategy = new LocalStrategy(User.authenticate())
passport.use('local', userStrategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());



//----------------------------------------

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride("_method"))


const indexRouter = require('./routes/index')
const authenticateRouter = require('./routes/authenticate')
const moviesRouter = require('./routes/movies')
const reservationRouter = require('./routes/reservation')
const userProfileRouter = require('./routes/userProfile')

app.use('/', indexRouter)
app.use('/authenticate', authenticateRouter)
app.use('/movies', moviesRouter)
app.use('/reservation', reservationRouter)
app.use('/userProfile', userProfileRouter)


mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error)) 
db.once('open', () => {
    console.log('database connected')
    admin.insertMany({"username": "admin" , "password" : "admin"})
    db.emit('database connected')
})


io.on('connection', (socket) => {
  console.log('new user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('seats', (sts) => {
    //console.log('seats: ' + sts);
    socket.broadcast.emit('seats', sts);
  });

});



server.listen(3000, () => {
  console.log('Server started at 3000')
  server.emit('server started')
})


module.exports = server;



