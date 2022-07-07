const passport = require("passport");
const { DB } = require("../services/config");
const App=require("./userpassport").PassportUser;
require("../auth/auth_jwt_session").PASSPORT;
const route=require("../routes/user_jwt_passport").UserRouteJWT_PASSPORT;


const DBconnetMiddle=(req,res,next)=>DB.connectDb().then(()=>next());

App.use(DBconnetMiddle,passport.initialize());


App.use("/jwt_passport",route);

module.exports.App=App;

