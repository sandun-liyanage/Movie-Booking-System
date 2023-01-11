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
const flash = require("express-flash")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const app = express()
const MongoStore = require('connect-mongo')
const connectEnsureLogin = require('connect-ensure-login');// authorization

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



// Configure Sessions Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  store: new MongoStore({ mongoUrl: process.env.DATABASE_URL })
}));

const strategy = new LocalStrategy(admin.authenticate())
passport.use('local', strategy);
passport.serializeUser(admin.serializeUser());
passport.deserializeUser(admin.deserializeUser());
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
const moviesRouter = require('./routes/movies')
const authenticateRouter = require('./routes/authenticate')

app.use('/movies', moviesRouter)
app.use('/', indexRouter)
app.use('/authenticate', authenticateRouter)


mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error)) 
db.once('open', () => {
    console.log('database connected')
    admin.register(
        new admin({ 
          username: "admin"
        }), "admin", function (err, msg) {
            if (err) {
                //console.log(err);
            } else {
                console.log({ message: "Successful" });
            }
        }
    )
})


app.use(function (req, res, next) {
	console.log(req.session.username);
	//we pass the currentUser variable to every ejs tenplate which contains the info of current user
	res.locals.admin = req.session.username;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.locals.admin = ""
app.locals.messages = ""




app.listen(3000, () => console.log('Server started at 3000'))



