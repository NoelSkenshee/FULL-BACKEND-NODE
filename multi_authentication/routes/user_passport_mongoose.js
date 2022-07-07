const route = require("express").Router();
const passport = require("passport");
const User = require("../models/User_passport").UserMOdelPassport;
const { DB, MessageResponse, Messages, statusCode } = require("../services/config");
const { connectDb, disconnectDb } = DB;

const middle = (req, res, next) => {
    const { method, session } = req;

    if (method == "GET" && !session.passport) {
        res.statusCode = statusCode.badReq;
        res.setHeader("WWW-Authenticate", "Basic");
        return res.json({ error: true, message: Messages.notauth, data: null })
    }
    disconnectDb()
    return next()
};


route.post("/register", (req, res, next) => {
    connectDb().then(() => {
        const { username, userImage, password } = req.body;
        if (!password) return MessageResponse.errorManager(Messages.field_missin, res, statusCode.badReq);
        User.register(new User({ userImage, username }), password, (err, user) => {
            disconnectDb()
            if (err) return MessageResponse.errorManager(err, res, statusCode.serverError);
            passport.authenticate("local")(req, res, () => {
                return MessageResponse.successManager(Messages.created_message, res, statusCode.created, user)
            })
        })
    }).catch((err) => MessageResponse.errorManager(err, res, statusCode.serverError))
})
    
.post("/login", (req, res, next) => connectDb().then(() => next()), passport.authenticate("local"), (req, res) => {
        disconnectDb();
        return MessageResponse.successManager(Messages.new_session, res, statusCode.success, null)
    })

.get("/listUsers", middle, (req, res, next) => {
        connectDb().then(() => {
            User.find({}).then((users) => {
                disconnectDb();
                return MessageResponse.successManager("", res, statusCode.success, users)
            }).catch((err) => MessageResponse.errorManager(err, res, statusCode.serverError));
        }).catch((err) => MessageResponse.errorManager(err, res, statusCode.serverError));
    })
    .get("/logoute", (req, res, next) => {
        let user = req.session.passport;
        if (!user) return MessageResponse.errorManager(Messages.not_logedin, res, statusCode.badReq);
        req.session.destroy();
        res.clearCookie("session-id")
        MessageResponse.successManager(Messages.oute_session, res, statusCode.success, null)
    });


module.exports.UserPassportRoute = route;

