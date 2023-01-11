const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

var adminSchema=mongoose.Schema(
{
	username: String,
	password: String,
	isAdmin: {
        type: Boolean,
        default: true
    }
});

adminSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Admin",adminSchema);