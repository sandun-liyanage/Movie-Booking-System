const express = require('express')
const router = express.Router()


router.get('/adminDashboard', (req, res) => {
    res.render('./adminDashboard/adminDashboard', {message: null})
})

router.get('/addMovies', (req, res) => {
    res.render('../addMovies', {message: null})
})

router.get('/updateMovies', (req, res) => {
    res.render('../updateMovies', {message: null})
})


module.exports = router