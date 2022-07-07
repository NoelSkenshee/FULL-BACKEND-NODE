import bodyParser from "body-parser";
import express, { application } from "express"
import Estudiante from '../data/models/Estudiante';

const Route_Estudiantes=express.Router();
Route_Estudiantes.use(bodyParser.json());
Route_Estudiantes.route("/")
.all((req,res,next)=>{
   // res.sendStatus(200);
    //res.setHeader("content-type","application/json");
    next();
})
.post(

    (req,res,next)=>{
        const {name,apellido,edad,promedio}= req.body;
        if(!name||!apellido||!edad||!promedio){
            //res.sendStatus(404);
            //res.setHeader("content-type","application/json");
            res.status(404).json({error:true,message:"Campos vacios"})
            
        }else{

         const estudiante1=new Estudiante(name,apellido,edad,promedio);
         console.log("--------------------------------------------------------------------//");
         
         console.log(estudiante1.setNewStudent())

        }
        
        
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


export default{ 
    route_estudiantes:Route_Estudiantes,
    name:"/students"
};


