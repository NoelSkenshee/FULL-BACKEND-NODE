const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const UserSchemaPassport=new Schema({
  //contain by default two fields : username, password
   userImage:String
},{timestamps:true});

UserSchemaPassport.plugin(passportLocalMongoose);

module.exports.UserMOdelPassport=mongoose.model("User",UserSchemaPassport)



