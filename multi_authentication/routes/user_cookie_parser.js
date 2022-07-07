const express = require("express");
const { connectDb, disconnectDb } = require("../services/config").DB;
const { badReq, created, serverError, success } = require("../services/config").statusCode;
const { errorManager, successManager, } = require("../services/config").MessageResponse
const route = express.Router();
const { ModelUserCookie } = require("../models/User_cookie");
const { Messages } = require("../services/config");

const middle = (req, res, next) => {
    const user = req.cookies.user;
    const { method } = req;
    if (method == "GET" && !user) {
        res.setHeader("WWW-Authenticate", "Basic")
        return errorManager("You are not autorized", res, badReq)
    }
    res.statusCode = 200;
    res.setHeader("WWW-Authenticate", "Basic")
    next()
};
route.post("/register", (req, res) => {
    const { username, password, userImage } = req.body;
    if (!username || !password) return errorManager(Messages.field_missin, res, badReq);
    connectDb().then(() => {
        ModelUserCookie.findOne({ username }).then((user) => {
            if (!user) {
                ModelUserCookie.create({ username, password, userImage }).then((user) => {
                    disconnectDb();
                    return successManager(Messages.created_message, res, created, null)
                }).catch((err) => {
                    disconnectDb();
                    errorManager(err, res, badReq)
                })//Cant regist user
            } else {
                disconnectDb();
                return errorManager(Messages.userReadyExist, res, badReq)
            }
        }).catch((err) => {
            disconnectDb();
            errorManager(err, res, badReq)
        })//Error when try to find user
    }).catch((err) => errorManager(err, res, serverError))//Cant connect to database
})
    .post("/login", (req, res) => {
        const authorization = req.headers.authorization;
        if (req.cookies.user) return errorManager(Messages.ready_logedIn, res, badReq)
        const [name, password] = new Buffer.from(authorization.split(" ")[1], "base64").toString().split(":");
        connectDb().then(() => {
            ModelUserCookie.findOne({ username: name }).then((user) => {
                if (!user || user.password != password) {
                    disconnectDb();
                    return errorManager(`User ${name} is not exist`, res, badReq)
                }
                res.cookie("user", true);
                disconnectDb();
                return successManager(Messages.new_session, res, success, null)
            }).catch((err) => {
                disconnectDb();
                errorManager(err, res, badReq)
            })
        }).catch((err) => errorManager(err, res, serverError))
    })
    .get("/listUsers", middle, (req, res) => {
        connectDb().then(() => {
            ModelUserCookie.find({}).then((listUsers) => {
                disconnectDb();
                return successManager(null, res, success, listUsers)
            }).catch((err) => {
                disconnectDb();
                return errorManager(err, res, badReq);
            })
        }).catch((err) => errorManager(err, res, serverError))
    })
    .get("/logoute", (req, res) => {
        if (!req.cookies.user) {
            return errorManager(Messages.not_logedin, res, badReq);
        }
        res.clearCookie("user");
        return successManager(Messages.oute_session, res, success, null)
    });


module.exports.CookieRoute = route;

