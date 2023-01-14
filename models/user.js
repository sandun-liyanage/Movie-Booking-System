const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")

var userSchema=mongoose.Schema(
{
	username: {type: String, required: true},
	password: {type: String, required: true}
});

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);