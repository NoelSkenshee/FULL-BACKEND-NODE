const { dbOperationError, connectDB, dbConnectionError, disconnectDB } = require('../config/config');

const express = require('express'), router = express.Router(), { UserModel } = require("../models/User");

router.all("/", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "apllication/json");
  next()
});


router.post("/regist", (req, res, next) => {
  connectDB().then(() => {
    const { name, password, userImage, email } = req.body;
    if (!name || !password) {
      res.statusCode = 404;
      return res.json({ error: true, message: "Fields required", data: null })
    }
    UserModel.findOne({ name }).then((user) => {
      if (user) {
        res.statusCode = 401;
        return res.json({ error: true, message: "Sorry but this already exist", data: null })
      }
      UserModel.create({ name, password, userImage, email }).then((result) => {
        disconnectDB();
        res.statusCode = 201;
        return res.json({ error: false, message: "Regist Successfuly", data: null })
      }).catch((err) => dbOperationError(err, res))
    }).catch((err) => dbOperationError(err, res))
  }).catch((err) => dbConnectionError(err, res))
});

router.post("/login", (req, res, next) => {
  if (!req.session.user) {
    const autorize = req.headers.authorization;
    if (!autorize) {
      res.statusCode = 401;
      res.setHeader("WWW-Authenticate", "Basic");
      return next()
    }
    const [name, password] = new Buffer.from(autorize.split(" ")[1], "base64").toString().split(":");
    console.log(name,password);
    connectDB().then(() => {
      UserModel.findOne({ name, password }).then((user) => {
        if (!user) {
          disconnectDB();
          res.statusCode = 403;
          return res.json({ error: true, message: "You are not exist in oure database", data: user })
        }
        disconnectDB();
        req.session.user = "You are in";
        res.json({ error: false, messsage: "You re in", data: null })
      }).catch((err) => dbOperationError(err, res))
    }).catch((err) => dbConnectionError(err, res))
  } else {
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    res.json({ error: false, message: "You are ready exist", data: null })
  }
});


router.get("/logoute", (req, res, next) => {
  const session = req.session.user;
  if (session) {
    res.statusCode = 200;
    req.session.destroy();
    res.clearCookie("session-id");
    res.json({ error: false, message: "You are oute" });
  }res.json({ error: true, message: "You are not loged in" });
})






module.exports = {
  path_user: "/user",
  route_user: router
};
