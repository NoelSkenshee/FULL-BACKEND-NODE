import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema;
const SchenaContact=new Schema({
  name: {
    type: String,
    required: true,  
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    min: 11,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  
},
{
  timestamps: true,
}
)



const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,  
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      min: 11,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact:{
      type:[SchenaContact],
    }
  },
  {
    timestamps: true,
  }
);


const UserModel=mongoose.model("Users",UserSchema);

export default UserModel;

