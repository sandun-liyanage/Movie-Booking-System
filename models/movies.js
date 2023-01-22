const mongoose = require("mongoose")

var moviesSchema=mongoose.Schema(
{
	movieName: {type: String, required: true},
	img: {type: String, required: true},
	date: {type: String, required: true},
	timeSlot: {type: String, required: true},
	ratings: Number,
	director: String,
	description: String,
	duration: String,
    seats: [String]
    
});


module.exports=mongoose.model("Movies",moviesSchema)