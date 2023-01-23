process.env.DATABASE_URL='mongodb+srv://user:user@cluster0.82avfip.mongodb.net/testDB?retryWrites=true&w=majority'

const flash = require("express-flash")

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
var mongoose = require("mongoose");

// Import server
var server = require('../server');
var movies = require('../routes/movies');
var reservation = require('../routes/reservation');

// Import movies Model   
var Movie = require("../models/movies");
var Reservation = require("../models/reservation");

chai.use(chaiHttp);

describe('testing API with database', function() {

    beforeEach(function(done) {
        Movie.deleteMany({}, function(err){})
        done()
    });

    afterEach(function(done) {
        Movie.deleteMany({}, function(err){})
        done();
    });

    it('should load all movies on /movies GET', function(done) {
        chai.request(server)
            .get('/movies/screeningMovies')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });



    
    it('should add a movie on /movies POST', function(done) {
        chai.request(server)
            .post('/movies/addMovie')
            .send({
                'username': 'new Movie 2',
                'movieName': 'new Movie 2',
                'img': 'imgLink',
                'date': '2023/03/12',
                'timeSlot': '11.30 am',
                'status': true
            })
            .end(function(err, res) {
                res.should.have.status(201);
                done();
            });
    });


    
})

