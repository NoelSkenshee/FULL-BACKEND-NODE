const app = require("./express_session_Auth").route_express_session;
const cookie_parser = require("cookie-parser");
const sessionExpress = require("express-session");
const { MessageResponse, statusCode, DB } = require("../services/config");
const passport = require("../auth/auth").passport;
const File = require("session-file-store")(sessionExpress);
const route = require("../routes/user_passport_mongoose").UserPassportRoute
//solo para practica ya que no es necesario;
app.use(sessionExpress({
    name: "session-id2",
    secret: "-------123456-hkjfjkddjgsjd-***************",
    saveUninitialized: true,
    resave: false,
    store: new File()
}));

app.use((req,res,next)=>DB.connectDb().then(()=>next()).catch((err) => MessageResponse.errorManager(err, res, statusCode.serverError)),passport.initialize());
app.use(passport.session());

app.use("/passport", route);
module.exports.PassportUser = app;

