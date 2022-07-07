const JWT = require("jsonwebtoken");
const PASSPORT = require("passport");
const EXTRACT_JWT= require("passport-jwt").ExtractJwt;
const STRATEGY_JWT = require("passport-jwt").Strategy;

const PASSPORT_EXTRATEGY = require("passport-local").Strategy;
const USER = require("../models/User_passport").UserMOdelPassport;
const { SEAD, EXPIRES_IN } = require("../services/config").JWT;

//module.exports.local=PASSPORT.use(new PASSPORT_EXTRATEGY(USER.authenticate()));

PASSPORT.serializeUser(USER.serializeUser());

PASSPORT.deserializeUser(USER.deserializeUser());


module.exports.genToken = (data) => JWT.sign(data, SEAD, { expiresIn: EXPIRES_IN });


module.exports.jwtPassport = PASSPORT.use(new STRATEGY_JWT({
    jwtFromRequest: EXTRACT_JWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SEAD
}, ({ _id }, done) => {
    USER.findById(_id, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
}));
module.exports.verifyUser=PASSPORT.authenticate("jwt",{session:false});

module.exports.PASSPORT=PASSPORT;