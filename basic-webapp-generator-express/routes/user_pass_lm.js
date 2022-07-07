const express = require("express");
const { verify } = require("jsonwebtoken");
const passport = require("passport");
const { genToken } = require("../Auth_congig");
const { connectDB, disconnectDB, dbConnectionError } = require("../config/config");
const { multer } = require("../config/config_file_upload");
const { corsOriginFilter, cors } = require("../config/corsconfiguration");
const UserModel = require("../models/PassportUser").UserModel_L_M;
const route = express.Router();



route.post("/regist", corsOriginFilter, multer().single("userImage"), (req, res) => {
    console.log("---------------------------");
    const { username, email, password } = req.body;
    connectDB().then(() => {
        UserModel.register(new UserModel({ username, email }), password, (err, user) => {
            if (err) {
                disconnectDB()
                res.setHeader("content-type", "application/json")
                res.statusCode = 500;
                return res.json({ error: true, message: err, data: null })
            }
            passport.authenticate("local")(req, res, () => {
                disconnectDB()
                res.statusCode = 200
                res.json({ error: true, message: "You are ready register", data: { ...user, file: req.file } })
            })
        })

    }).catch((err) => dbConnectionError(err, res))
});



route.post("/login", (req, res, next) => {
    connectDB().then(() => next()).catch((err) => dbConnectionError(err, res))
}, (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err || !user) {
            res.statusCode = 401;
            return re.json({ error: true, message: info, data: null })
        }
        const { _id, username, email, userImage } = user;
        const token = "bearer " + genToken({ _id });
        res.statusCode = 200;
        res.setHeader("content-type", "application/json")
        disconnectDB()
        res.json({ error: false, message: "You are logged in", data: { username, email, userImage, token } })

    })(req, res);

});

route.get("/isvalidToken", (req, res) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
            res.statusCode = 401;
            return res.json({ error: true, message: info, data: false })
        }
        res.statusCode = 200;
        return res.json({ error: false, message: "Your token until is valid", data: true })
    })(req, res)

});

route.get("/facebook/token", (req, res, next) => {
    connectDB().then(() => next()).catch((err) => dbConnectionError(err, res))
}, passport.authenticate("facebook-token"), (req, res) => {
    const { _id, username, email, userImage } = req.user;
    const token = "bearer " + genToken({ _id });
    res.statusCode = 200;
    res.setHeader("content-type", "application/json")
    disconnectDB()
    res.json({ error: false, message: "You are logged in", data: { username, email, userImage, token } })
});



route.get("/logoute", cors, verify, (_, res, next) => connectDB().then(() => next()).catch((err) => dbConnectionError(err, res)), (req, res) => {
    const user = req.user;
    res.setHeader("content-type", "application/json")
    if (!user) {
        res.statusCode = 404;
        return res.json({ error: true, message: "You are not loged in", data: null })
    }
    disconnectDB()
    req.session.destroy();
    res.clearCookie("session-id");
    res.json({ error: false, message: "You are oute", data: null })
});





module.exports = {
    name_route_user: "/user",
    route_user: route
}
