const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

var adminSchema=mongoose.Schema(
{
	username: {type: String, required: true},
	password: {type: String, required: true},
	isAdmin: {
        type: Boolean,
        default: true
    }
});

adminSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Admin",adminSchema);