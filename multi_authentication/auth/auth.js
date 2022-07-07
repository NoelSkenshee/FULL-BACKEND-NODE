const User=require("../models/User_passport").UserMOdelPassport;
const passport=require("passport");
const Strategy=require("passport-local").Strategy;

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports.passport=passport;