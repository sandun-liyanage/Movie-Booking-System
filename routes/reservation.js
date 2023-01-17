const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const Reservation = require('../models/reservation')
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


//load book movie page
router.get('/bookMovie', async (req, res) => {
    if(req.isAuthenticated()){
        let movieName = req.query.movieName
    
        Movie.findOne({movieName: movieName}, function(err, movie){
            if(err){
                console.log(err)
            }else{
                console.log(movie)
                res.render('./userDashboard/bookMovie', {
                    movieName: movie.movieName, 
                    date: movie.date,
                    timeSlot: movie.timeSlot, 
                    img: movie.img,
                    name: req.user.username,
                    seats: movie.seats
                }) 
            }
        })
    }else{
        req.flash('message', "please login before making reservations")
        res.redirect('/movies/screeningMovies')
    }
    
    
})


//book the movies
router.post('/bookMovie', async (req,res) => {

    if(req.isAuthenticated()){
        Movie.updateMany({'movieName': req.query.movieName}, {'seats' : req.body.checkList, 'bookingName': req.user.username}, 
        function (err, success){
            if(err){
                console.log(err)
            }else{
                console.log("booked seats updated in database")
            }
        }) 
        
        Movie.findOne({'movieName': req.query.movieName}, function(err, movie){
            if(err){
                console.log(err)
            }else{
                Reservation.insertMany(
                    new Reservation({
                        bookingName: req.user.username,
                        movieName: movie.movieName,
                        img: movie.img,
                        date: movie.date,
                        timeSlot: movie.timeSlot,
                        seats: req.body.checkList
                    }), function(err, success){
                        if(err){
                            res.render('./userDashboard/screeningMovies', {message: err})
                        }else{
                            req.flash('message', "successfully booked the movie. you can check your booking details in your profile.")
                            res.redirect('/movies/screeningMovies')
                        }
                    }
                )
            }
        })
    }else{
        req.flash('message', "please login before making reservations")
        res.redirect('/movies/screeningMovies')
    }
    

})




//view user reservations - for admin
router.get('/userReservations', (req,res) => {
    Reservation.find({movieName: req.query.movieName}, function(err,reserv){
        if(reserv[0] == undefined){
            req.flash('message', "no reservations for the selected movie.")
            res.redirect('/movies/manageMovies')
        }else{
            res.render('./adminDashboard/userReservations', {reserv: reserv})
        }
    })
})



module.exports = router