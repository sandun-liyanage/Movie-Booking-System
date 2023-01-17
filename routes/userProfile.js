const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const Reservation = require('../models/reservation')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const { response } = require('express')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(express.json())
router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'))


router.get('/getReservations', (req,res) => {
    if(req.isAuthenticated()){
        Reservation.find({bookingName: req.user.username}, function(err, docs){
            if(err){
                console.log(err)
                res.render('./userDashboard/profile', {message: "you don't have any reservations yet"})
            }else{
                console.log(docs)
                res.render('./userDashboard/profile', {data: docs, userName: req.user.username, message: req.flash('message')})
            }
        })
    }else{
        req.flash('message', "please login to see your profile and reservations")
        res.redirect('/')
    }
})


module.exports = router