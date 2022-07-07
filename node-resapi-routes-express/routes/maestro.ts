import express from "express";


const Route_Maestros=express.Router();


Route_Maestros.route("/")
.post(
    (req,res,next)=>{

    }
)
.put(
   (req,res,next)=>{

   }
)
.get(
   (req,res,next)=>{
       
   }
)
.delete(
    (req,res,next)=>{

    }
);


export default {
   route_maestro:Route_Maestros,
   name:"maestros"

}
