const { Router } = require("express");
const passport = require("../auth/auth_jwt_session").PASSPORT;
const ROUTE = Router("/");
const { genToken, verifyUser } = require("../auth/auth_jwt_session");
const USER = require("../models/User_passport").UserMOdelPassport;
const { connectDb, disconnectDb, errorManager, new_session,
    successManager, serverError, field_missin, not_logedin,
    badReq, created_message, success, created, ready_logedIn
} =
{
    ...require("../services/config").DB,
    ...require("../services/config").Messages,
    ...require("../services/config").statusCode,
    ...require("../services/config").statusCode,
    ...require("../services/config").MessageResponse,
};

ROUTE
    .post("/register", (req, res, next) => {

        connectDb().then(() => {
            const { username, password, userImage } = req.body;
            if (!username || !password) return errorManager(field_missin, res, badReq);
            USER.register(new USER({ username, userImage }), password, (err, user) => {
                if (err) {
                    disconnectDb()
                    return errorManager(err, res, badReq)
                }
                passport.authenticate("local")(req, res, (err,user) => {
                    console.log(user);
                    const {username,_id}={...user._doc},token=genToken({username,_id});
                    disconnectDb()
                    return successManager(created_message, res, created, {username,_id})
                })
            })
        }).catch((err) => errorManager(err, res, serverError))
    })
    .post("/login", (req, res, next) => connectDb().then(() => next()), passport.authenticate("local"), (req, res) => {
        const user= req.user;
        if (user) {
            const token="bearer " + genToken({username:user.username,_id:user._id});
            disconnectDb();
             const {username,_id}={...user._doc}
            return successManager(new_session, res, success, {token,username,_id})
        } else {
            disconnectDb();
            return errorManager(not_logedin, res, badReq)
        }
    })
    .get("/allUsers", verifyUser,(req,res,next) => {
          connectDb().then(()=>{
              USER.find({}).then((users)=>{
                 return successManager(null,res,success,users);
              }).catch((err)=>errorManager(err, res, badReq))
          }).catch((err) => errorManager(err, res, serverError))
    });

module.exports.UserRouteJWT_PASSPORT=ROUTE;