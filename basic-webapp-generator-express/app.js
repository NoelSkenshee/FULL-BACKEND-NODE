var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var express_session = require("express-session");
var fileStore = require("session-file-store")(express_session)

var indexRouter = require('./routes/index');
var { route_user, name_route_user } = require('./routes/user_pass_lm');
const passport = require('passport');
const { route_dich, route_name_dich, route_leader, route_promo, route_name_leader, route_dish_comment, route_name_promo } = /* PATRON =FABRICA */{ ...require("./routes/dishes"), ...require("./routes/leaders"), ...require("./routes/promotion") };


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');//|| any else

app.use(morgan('dev'));
app.use(express.json());// 0 body-parser
app.use(express.urlencoded({ extended: false }));///  form html
//app.use(cookieParser("code----------1234567890*******************code-ewjffdfakdsfdnjsdnkgkjnsdjgnsa,d"));

require("./Auth_congig");



const { connectDB, disconnectDB, dbConnectionError } = require('./config/config');
const multer = require('multer');
const { route_favorites } = require('./routes/favorites');


app.use(express_session({
  name: "session-id",
  secret: "code1234567890",
  saveUninitialized: true,
  resave: false,
  store: new fileStore(),
}));




app.use((req, res, next) => connectDB().then(() => next()).catch((err) => dbConnectionError(err, res)), passport.initialize());
//app.use(passport.session());
app.all("*",(req,res,next)=>{

  if(req.secure){
    return next()
  }
  res.redirect(307,`https://${req.hostname}:${app.get('port2')}${req.url}`)

});

app.use(express.static(path.join(__dirname, 'public')));
app.use(name_route_user, route_user);

app.use(route_name_dich.name, route_dich);
app.use(route_name_dich.name_coment, route_dish_comment);
app.use(route_name_promo.name, route_promo);
app.use(route_name_leader.name, route_leader);
app.use("/favorites", route_favorites);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
/*
 * 
 * 
 */
// error handler
app.use(function (err/*message frome the next()*/, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
