const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

var moviesSchema=mongoose.Schema(
{
	movieName: {type: String, required: true},
	img: {type: String, required: true},
	timeSlot: {type: String, required: true, unique: true},
	ratings: Number,
	director: String,
	description: String,
	duration: String
    
});

moviesSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model("Movies",moviesSchema)