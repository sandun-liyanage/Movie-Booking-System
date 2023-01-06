const express = require('express')
const router = express.Router()

//getting all movies
router.get('/', (req, res) => {
    res.send('hello')
})

//getting one movie
router.get('/:id', (req, res) => {

})

//creating a movie
router.post('/', (req, res) => {

})

//updating a movies
router.patch('/', (req, res) => {

})

//deleting a movies
router.delete('/:id', (req, res) => {

})

module.exports = router