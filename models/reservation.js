const mongoose=require("mongoose")

var reservationSchema=mongoose.Schema(
{
	username: String,
	movieName: String,
    date: Date,
    time: String,
    numOfSeats: Number,
    seats: [{
        id: String,
        available: Boolean
    }]
});

reservationSchema.index({ movieName: 1, date: 1, time: 1, seats: 1}, { unique: true });

module.exports=mongoose.model("Reservation",reservationSchema);