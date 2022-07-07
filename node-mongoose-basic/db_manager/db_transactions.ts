import mongoose from "mongoose";
import UserModel from "../models/users";
import User_Model from "../models/users";

const dbhost = "mongodb://localhost:27017/Users";

export default {
  setUser:  (payload: any) => {
     mongoose.connect(dbhost);
    const newUser = new User_Model({ ...payload });
    newUser
      .save()
      .then((res: any) => {
        console.log("USER SAVED SUCCESSFULLY", res);
        mongoose.disconnect();
      })
      .catch((err: any) => {
        console.log(new Error(err));
        mongoose.disconnect();
      });
  },
  upUser: (matchPayload: any, payload: any) => {
    mongoose.connect(dbhost);
    UserModel.updateOne(matchPayload, { $set: { ...payload } })
      .then((res) => {
        console.log("Registro modificado con exito");
        console.log(res);
        console.log("-------------------------------------------");
        mongoose.disconnect();
      })
      .catch((err) => {
        console.log("Lo sentimos, hubo un error");
        console.log(err);
        console.log("-----------------------------------------");
        mongoose.disconnect();
      });
  },
  setContact:(id:string,contact:any)=>{
     mongoose.connect(dbhost)
     UserModel.findById(id).then((res)=>{
          console.log(res);
          res.contact.push(contact);
          UserModel.findByIdAndUpdate(id,res).then(()=>{
            console.log("Ready!!");
            mongoose.disconnect()
          });
     })
  },

  getAll: () => {
    mongoose.connect(dbhost);
    UserModel.find()
      .then((res) => {
        mongoose.disconnect();
        console.log("Lista de registros");
        console.log(JSON.stringify(res));
        console.log("-----------------------------------------");
      })
      .catch((err) => {
        mongoose.disconnect();
        console.log("Algo anda mal");
        console.log(err);
        console.log("--------------------------------");
      });
  },
   deleteUsers:()=>{
    mongoose.connect(dbhost);
    UserModel.remove({}).then(()=>{
      console.log("Todos los registros fueron eliminado");
      
    mongoose.disconnect()
  });
   }

};
