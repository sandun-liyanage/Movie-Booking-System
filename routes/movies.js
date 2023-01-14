const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const { response } = require('express')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(express.json())
router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'))


//getting all movies
router.get('/screeningMovies', (req, res) => {
    Movie.find((err, docs) => {
        if (!err) {
            //console.log(docs)
            res.render("./userDashboard/screeningMovies", {data: docs});
        } else {
            console.log('Failed to retrieve the movie List: ' + err);
        }
    });
})

/*
//getting one movie
router.get('/:id', (req, res) => {

})
*/
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
            res.render('./adminDashboard/adminDashboard', {message: "movie added successfully"})
        } 
    })
     
    
})

//updating a movies
router.get('/updateMovie', (req, res) => {
    res.render('./adminDashboard/updateMovies')
})

router.patch('/updateMovie', (req, res) => {
    Movie.updateMany({'movieName': req.body.movieName}, req.body, 
        function (err, success){
            if(err){
                res.render('./adminDashboard/updateMovies', {message: err})
            }else{
                res.render('./adminDashboard/adminDashboard', {message: "successfully updated movie details"})
            }
    })
})



//deleting a movies

router.get('/deleteMovie', (req, res) => {
    res.render('./adminDashboard/deleteMovies')
})


router.delete('/deleteMovie', (req, res) => {
    Movie.deleteMany({'movieName' : req.body.movieName}, function(err, success){
        if(err){
            res.render('./adminDashboard/deleteMovies', {message: err})
        }else{
            res.render('./adminDashboard/adminDashboard', {message: "successfully deleted movie details"})
        }
    })
})

module.exports = router