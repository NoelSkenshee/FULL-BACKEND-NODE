const app=require("./cookieAuth").CookieApp;
const cookieParser=require("cookie-parser");
const  session=require("express-session");
const fileStoreSSS=require("session-file-store")(session);
const bodyParser=require("body-parser");
const expressSessionRoute=require("../routes/user_express_session").ExpressSession
//

app.use(cookieParser());
app.use(session({
  name:"session-id",
  secret:"-----------code----------123456**************" ,
  saveUninitialized:true,
  resave:false,
  store:new fileStoreSSS()
}));

app.use(bodyParser.json());

app.use("/sessionExp",expressSessionRoute);

module.exports.route_express_session=app;

