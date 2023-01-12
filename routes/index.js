const express = require('express')
const router = express.Router()
const flash = require("express-flash")

router.use(flash())


router.get('/', (req, res) => {
    res.render('index', {message: req.flash('message')})
})



module.exports = router