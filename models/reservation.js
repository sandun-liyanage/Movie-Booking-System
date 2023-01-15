const mongoose=require("mongoose");
//const { schema } = require("../models/seats");
//const Seats = require('../models/seats')

var seatsSchema=mongoose.Schema(
{
    seatId: String,
    available: {type: Boolean, default: true}
});

var reservationSchema=mongoose.Schema(
{
	bookingName: String,
	movieName: String,
    img: String,
    date: String,
    timeSlot: String,
    seats: [String]
});

reservationSchema.index({ movieName: 1, date: 1, time: 1, seats: 1}, { unique: true });

module.exports=mongoose.model("Reservation",reservationSchema);