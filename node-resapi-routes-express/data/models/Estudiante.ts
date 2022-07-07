import  fs from "fs";
import  path from "path";


export default class Estudiante{
     public name_:string;
     public apellido:string;
     public edad:number;
     public promedio:number;
    public  constructor(name:string,apellido:string,edad:number,promedio:number){
      this.name_=name;
      this.apellido=apellido;
      this.edad=edad;
      this.promedio=promedio;
    }

    private validateData(campos:string[]){
        if(campos.includes(""))return false;
        else return true;
    }

    setNewStudent(){
         if(!this.validateData([this.apellido,this.name_,this.edad.toString(),this.promedio.toString()]))return {error:true,message:"Campos no completados"};
         let res= fs.readFileSync(path.resolve("./data/db/student.json")).toString();
          let data=JSON.parse(res);
          
          fs.writeFileSync(path.resolve("./data/db/student.json"),JSON.stringify(JSON.parse({...data})))
          
      }


 
};

