if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const passport = require("passport")
const LocalStrategy = require("passport-local")
const methodOverride = require("method-override")
const admin = require('./models/admin')
const flash = require("express-flash")
const session = require('express-session')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(methodOverride("_method"))



const indexRouter = require('./routes/index')
const moviesRouter = require('./routes/movies')
const userManageRouter = require('./routes/userManage')

app.use('/movies', moviesRouter)
app.use('/', indexRouter)
app.use(userManageRouter)

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error)) 
db.once('open', () => {
    console.log('database connected')
    admin.deleteMany()
    admin.register({"userName": "admin"}, {"password": "admin"}, (req, res) => {
        console.log("DB Seed complete")
        passport.authenticate("local")
    })
    
})



app.use(session(
	{
		secret: "hello world",
		resave: false,
		saveUninitialized: false

	}
));

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(admin.authenticate()))
passport.serializeUser(admin.serializeUser())
passport.deserializeUser(admin.deserializeUser())

app.locals.admin = passport.user;




app.listen(3000, () => console.log('Server started at 3000'))



