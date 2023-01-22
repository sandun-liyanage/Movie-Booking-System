process.env.DATABASE_URL='mongodb+srv://user:user@cluster0.82avfip.mongodb.net/testDB?retryWrites=true&w=majority'

const flash = require("express-flash")
const first = require('./testMovies')

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
var mongoose = require("mongoose");

// Import server
var server = require('../server');
var movies = require('../routes/movies');
var reservation = require('../routes/reservation');

// Import Model   
var Movie = require("../models/movies");
var Reservation = require("../models/reservation");

chai.use(chaiHttp);

describe('unit testing', function() {

    beforeEach(function(done) {
        Movie.deleteMany({}, function(err){})
        done()
    });

    afterEach(function(done) {
        Movie.deleteMany({}, function(err){})
        done();
    });


/*
    it('should calculate the number of selected seats in reservation', function(done) {
        chai.request(server)
            .post('/reservation/seatCount')
            .send({
                'selected_seats': [10,11,12,13],
                //'status': true
            })
            .end(function(err, res) {
                res.body.noOfSeats.should.equal(4);
                done();
            });
    });
*/
    
})

