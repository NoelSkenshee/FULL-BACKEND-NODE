const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
  name:{
    type:String,
    unique:true,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  UserImage:String
},{timestamps:true});

module.exports={
    UserModel:mongoose.model("User",UserSchema)
}