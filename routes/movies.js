const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

//getting all movies
/*router.get('/', (req, res) => {
    res.send('hello')
})

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
        ratings: req.body.ratings,
        director: req.body.director,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
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
    Movie.updateMany({'movieName': req.body.movieName ,$set:{
        'img': req.body.img, 
        'ratings': req.body.ratings,
        'director': req.body.director,
        'description': req.body.description,
        'releaseDate': req.body.releaseDate,
        'duration': req.body.duration
    }}, function (err, success){
        if (err){
            res.render('./adminDashboard/updateMovies', {message: err})
        }else{
            res.render('./adminDashboard/adminDashboard', {message: "movie updated successfully"})
        }
    })
})

//deleting a movies
router.delete('/:id', (req, res) => {

})

module.exports = router