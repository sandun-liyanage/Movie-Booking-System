const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const admin = require("../models/admin")
const user = require("../models/user")
const passport = require("passport")
const localStrategy = require("passport-local")


router.get("/admin",isAdmin,function(req,res)
{
	var admin=req.user;
	res.render("home.ejs")
})

//---------------login admin----------------//
router.get("/admin/login", (req,res) => {
    res.render("users/adminLogin")
})

//router.post("/admin/login",passport.authenticate("local",{
//	successRedirect: "/index",
//	failureRedirect: "/admin/login"
//}), (req, res) => {})

router.post("/admin/login",passport.authenticate("local",{
	successRedirect: "/index",
	failureRedirect: "/users/adminLogin"
}))




function isAdmin(req,res,next){
	if(req.isAuthenticated()&&req.user.isAdmin==true)
		return next()
	req.flash("error","You Must be signed in as Admin")
	res.redirect("users/adminLogin")
}



module.exports = router