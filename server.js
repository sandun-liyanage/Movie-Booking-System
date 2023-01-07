if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())


const indexRouter = require('./routes/index')
const moviesRouter = require('./routes/movies')

app.use('/movies', moviesRouter)
app.use('/', indexRouter)

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))


app.listen(3000, () => console.log('Server started at 3000'))
