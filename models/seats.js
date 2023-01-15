const mongoose=require("mongoose")

var seatsSchema=mongoose.Schema(
{
	seatId: String,
	available: Boolean
});


module.exports=mongoose.model("Seats",seatsSchema);