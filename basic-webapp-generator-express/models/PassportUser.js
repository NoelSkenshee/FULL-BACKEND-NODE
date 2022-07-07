const mongoose = require("mongoose");
const passport_l_mongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;


const UserPassportLocalM = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userImage: String,
    favorite:{
        type:Schema.Types.ObjectId,
        ref:"Favorites"
     }
},{timestamps:true});

UserPassportLocalM.plugin(passport_l_mongoose)


module.exports={
    UserModel_L_M:mongoose.model("userpassport",UserPassportLocalM)}