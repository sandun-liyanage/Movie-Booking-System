const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

var moviesSchema=mongoose.Schema(
{
	movieName: String,
	img: String,
	ratings: Number,
	director: String,
	description: String,
	releaseDate: String,
	duration: String,
    seats: [{
        id: String,
        available: Boolean
    }]
});

moviesSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model("Movies",moviesSchema)