const passport = require("passport");
const Estrategy = require("passport-local").Strategy;
const EstrategyJWT = require("passport-jwt").Strategy;
const Extract = require("passport-jwt").ExtractJwt;
const FACEBOOK_PASSPORT = require("passport-facebook-token");
const JWT = require("jsonwebtoken");
const { SECRET, EXPIRE_TIME, connectDB, CLIENT_ID_FACEBOOK, CLIENT_SECRET_FACEBOOK, disconnectDB } = require("./config/config");
const User = require("./models/PassportUser").UserModel_L_M;


module.exports.local = passport.use(new Estrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports.genToken = (payload) => JWT.sign(payload, SECRET, { expiresIn: EXPIRE_TIME });
module.exports.jwtPassport = passport.use(new EstrategyJWT({
    secretOrKey: SECRET,
    jwtFromRequest: Extract.fromAuthHeaderAsBearerToken()
}, ({ _id }, done) => {
    connectDB().then(() => {
        User.findById(_id, (err, user) => {
            if (err) {
                return done(err, false)
            } else if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }).catch((err) => {
        return done(err, false)
    })

}));


module.exports.facebookPassport = passport.use(new FACEBOOK_PASSPORT({
    clientID: CLIENT_ID_FACEBOOK,
    clientSecret: CLIENT_SECRET_FACEBOOK
}, (accessToken, tokenRefresh, profile, cb) => {
    connectDB().then(() => {
        User.findOne({ facebookId: profile.id }, (err, user) => {
            console.log(user+"---------------------------------");
            if (err) {
                disconnectDB()
                return cb(err, fasle)
            } else if (user) {
                disconnectDB()
                return cb(null, user)
            } else {
                let user = new User.create({ username: profile.displayName }); user.facebookId = profile.id;
                user.firstname = profile.name.givenName;
                user.lastname = profile.name.familyName;
                user.userImage = profile.photos;
                user.save((err, user) => {
                    disconnectDB()
                    if (err) return cb(err, false)
                    return cb(null, user)
                })
            }

        })


    }).catch((err) => cb(err, false))
}))






module.exports.verify = passport.authenticate("jwt", { session: false });

module.exports.verifyAdmin = (req, res, next) => {
    const { _id, username, admin } = JSON.parse(JSON.stringify(req.user));
    console.log(_id, username, admin);
    if (admin) return next()
    else {
        res.statusCode = 400;
        res.json({ error: true, message: "You cant realize this operation", data: null })
    }
};





