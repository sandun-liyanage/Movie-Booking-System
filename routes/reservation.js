const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const { response } = require('express')
const passport = require('passport')
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require('passport-local-mongoose')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(express.json())
router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'))


router.get('/bookMovie', async (req, res) => {
    let movieName = req.query.movieName
    Movie.findOne({username: movieName}, function(err, movie){
        if(err){
            console.log(err)
        }else{
            
            res.render('./userDashboard/bookMovie', {
                movieName: movie.movieName, 
                timeSlot: movie.timeSlot, 
                img: movie.img,
                name: req.user.username
            })
        }
    })
    
    
})



module.exports = router