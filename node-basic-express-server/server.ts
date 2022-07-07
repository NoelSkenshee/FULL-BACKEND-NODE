import http from 'http';
import express from "express";
import morgan from "morgan"

//App exores imiciado
const app=express();
app.use(morgan("dev"));
//sirviendo archovos estaticos 

app.use(express.static(__dirname+"/public"));


//creando un midd que responde en caso de errores de solicitud 
app.use((req,res,next)=>{
     res.status(400)
     res.setHeader("content-type","text/html")
     res.end("<html><body><h1>Error : 400 ! :(</h1></body></html>")

});


//creando el servidor

const SERVER=http.createServer(app);

export const Service= {
    SERVER,
    PORT:9099,
    HOSTNAME:"localhost"
}

