const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require('passport-local-mongoose')
const methodOverride = require('method-override')
const admin = require('../models/admin')
const session = require('express-session')
const flash = require("express-flash")
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json())
router.use(express.json())
router.use(flash())
router.use(express.urlencoded());


//----------------------admin login----------------------//

router.get('/adminLogin', (req, res) => {
    res.render('./users/adminLogin')
})

router.post('/adminLogin', passport.authenticate('local', { 
    failureRedirect: '/authenticate/adminLogin', 
    successRedirect: ('../')
  }), (err, req, res, next) => {
    req.session.user = user
    if (err) next(err);
  });

/*
router.post('/adminLogin', function(req, res, next) {
    console.log(req.url);
    passport.authenticate('local', function(err, user, info) {
        console.log("authenticate");
        console.log(err);
        console.log(user);
        console.log(info);
        console.log(req.body.username)
        console.log(req.body.password)
    })(req, res, next);
});

/*
router.post('/adminLogin', passport.authenticate('local', { 
    failureRedirect: '/authenticate/adminLogin', 
    successRedirect: '../'
  }), (err, req, res, next) => {
    if (err) next(err);
});

router.post('/adminLogin', passport.authenticate('local', { failureRedirect: '/authenticate/adminLogin' }),  function(req, res) {
	console.log(req.user)
	res.redirect('../');
    failureFlash: true
});
/*
router.post('/adminLogin', passport.authenticate('local', {
    successRedirect: '../',
    failureRedirect: '/authenticate/adminLogin',
    failureFlash: true
}))
*/

//----------------------user login----------------------//

router.get('/users/userLogin', (req, res) => {
    res.render('/users/userLogin')
  })
  
router.post('/users/userLogin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/userLogin',
    failureFlash: true
}))


//----------------------user signup----------------------//

router.get('/users/userSignup', (req, res) => {
    res.render('/users/userSignup')
})
  
router.post('/users/userSignup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            username: req.body.username,
            password: hashedPassword
        })
        res.redirect('/users/userLogin')
    } catch {
        res.redirect('/users/userSignup')
    }
})


//---------------------user/admin logout---------------//
router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})
  




module.exports = router