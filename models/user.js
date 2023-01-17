const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")

var userSchema=mongoose.Schema(
{
	username: String,
	email: {type: String, required: true},
	password: String
});

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);