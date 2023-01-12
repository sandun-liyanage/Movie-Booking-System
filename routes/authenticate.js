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


//----------------------admin login----------------------//

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




//----------------------user login----------------------//

router.get('/userLogin', (req, res) => {
    res.render('./users/userLogin')
})

  
router.post('/userLogin', passport.authenticate('local', {
    successRedirect: '../',
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
            username: req.body.username, 
            email: req.body.email 
        }), req.body.password, function (err, msg) {
            if (err) { 
                req.flash('message', err.message)
                res.redirect('/authenticate/userSignup')
            } else { 
                req.flash('message', 'successfully signed up to the system')
                res.redirect('../')
            }
        }
    )
})
  


//---------------------user/admin logout---------------//
router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})
  




module.exports = router