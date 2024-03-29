const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require('passport-local-mongoose')
const methodOverride = require('method-override')
const admin = require('../models/admin')
const User = require('../models/user')
const session = require('express-session')
const flash = require("express-flash")
const bodyParser = require('body-parser')
const alert = require('alert')
const moviesRouter = require('./movies')

var urlencodedParser = bodyParser.urlencoded({ extended: true })
router.use(express.json())
router.use(flash())
router.use(express.urlencoded({extended: true}));




//----------------------user login----------------------//

router.get('/userLogin', (req, res) => {
    res.render('./users/userLogin',  {message: req.flash('message')})
})

  
router.post('/userLogin', passport.authenticate('local', {
    successRedirect: '/movies/screeningMovies',
    failureRedirect: '/authenticate/userLogin',
    failureFlash: true
}))


//----------------------user signup----------------------//

router.get('/userSignup', (req, res) => {
    res.render('./users/userSignup', {message: req.flash('message')})
})

router.post('/userSignup', function (req, res) {
    User.register(
        new User({ 
            email: req.body.email,
            username: req.body.username
        }), req.body.password, function (err, msg) {
            if (err) { 
                req.flash('message', err.message)
                res.redirect('/authenticate/userSignup')
            } else { 
                req.flash('message', 'successfully signed up to the system')
                res.redirect('/')
            }
        }
    )
})
  

//----------------------admin login and logout----------------------//

router.get('/adminLogin', (req, res) => {
    res.render('./users/adminLogin', {message: null})
})

router.post('/adminLogin', (req,res) => {
    if(req.body.username == "admin" && req.body.password == "admin"){
        res.render('./adminDashboard/adminDashboard')
    }else{
        res.render('./users/adminLogin', {message: "error.. invalid credentials"})
    }
});

router.get('/adminLogout', (req, res) => {
    res.redirect('/' )
})


//---------------------user/admin logout---------------//
router.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
    res.redirect('/')
    })
})
  




module.exports = router