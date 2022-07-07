const app=require("express")();
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");

const {CookieRoute}=require("../routes/user_cookie_parser")

//
app.use(cookieParser("***************635654753454264-------------------fsdzjfgdjfgsdjfs"));
app.use(bodyParser.json());

app.use("/cookie",CookieRoute);

module.exports.CookieApp=app;