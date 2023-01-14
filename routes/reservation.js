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


router.get('/bookMovie', async (req, res) => {
    let docs = req.query.docs
    console.log(docs)
})



module.exports = router