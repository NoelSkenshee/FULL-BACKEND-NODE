const cors=require("cors");


const posibleOrigin=['https://localhost:8080','http://localhost:8000','http://localhost:9090','http://localhost:3000'];

const filterOrigin=(req,cb)=>{
     let opt={origin:false};
     if(posibleOrigin.includes(req.header("Origin"))){
         opt.origin=true;  
     }

     cb(opt)
};




module.exports.cors=cors();
module.exports.corsOriginFilter=cors(filterOrigin);




