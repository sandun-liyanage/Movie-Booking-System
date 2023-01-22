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


//getting all movies for user
router.get('/screeningMovies', (req, res) => {
    Movie.find((err, docs) => {
        if (!err) {
            //console.log(docs)
            res.render("./userDashboard/screeningMovies", {data: docs, message: req.flash('message')});
        } else {
            console.log('Failed to retrieve the movie List: ' + err);
        }
    });
})


//getting movies for admin
router.get('/manageMovies', (req, res) => {
    Movie.find((err, docs) => {
        if (!err) {
            //console.log(docs)
            res.render("./adminDashboard/manageMovies", {data: docs, message: req.flash('message')});
        } else {
            console.log('Failed to retrieve the movie List: ' + err);
        }
    });
})


//creating a movie
router.get('/addMovie', (req, res) => {
    res.render('./adminDashboard/addMovies')
})

router.post('/addMovie', function (req, res) {
    Movie.insertMany(
        new Movie({
        username: req.body.movieName,
        movieName: req.body.movieName, 
        img: req.body.img, 
        date: req.body.date,
        timeSlot: req.body.timeSlot,
        ratings: req.body.ratings,
        director: req.body.director,
        description: req.body.description,
        duration: req.body.duration
    }), function (err, msg) {
        if(err){
            console.log(err)
            res.render('./adminDashboard/addMovies', {message: err})
        }else{
            res.status(201)
            res.render('./adminDashboard/adminDashboard', {message: "movie added successfully"})
        } 
    })
    /*
    Reservation.insertMany (
        new Reservation({
            username: req.body.movieName,
            movieName: req.body.movieName,
            img: req.body.img,
            date: req.body.date,
            timeSlot: req.body.timeSlot
        }), function (err, msg) {
            if(err){
                console.log(err)
            }else{
                console.log("movie added for reservation")
            }
        }
    )*/

})

//updating a movies
router.get('/updateMovie', (req, res) => {
    Movie.findOne({movieName: req.query.movieName}, function(err,mov){
        if(err){
            res.render('./adminDashboard/manageMovies', {message: err})
        }else{
            res.render('./adminDashboard/updateMovies', {movie: mov})
        }
    })
    
})

router.patch('/updateMovie', (req, res) => {
    Movie.updateMany({'movieName': req.body.movieName}, req.body, 
        function (err, success){
            if(err){
                res.render('./adminDashboard/updateMovies', {message: err})
            }else{
                req.flash('message', "successfully updated movie details")
                res.redirect('/movies/manageMovies')
            }
    })
})



//deleting a movies

router.get('/deleteMovie', (req, res) => {
    Movie.deleteMany({'movieName' : req.query.movieName}, function(err, success){
        if(err){
            req.flash('message', err)
            res.redirect('/movies/manageMovies')
        }else{
            //res.json({'message': "successfully deleted movie details"})
            req.flash('message', "successfully deleted movie details")
            res.redirect('/movies/manageMovies')
        }
    })
})



module.exports = router