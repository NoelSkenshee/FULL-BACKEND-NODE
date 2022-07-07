import server from "./server";

const {SERVER,PORT,HOSTNAME,PROTOCOL}=server;



SERVER.listen(PORT,HOSTNAME,()=>{

   console.log(`Escuchando servidor en : ${PROTOCOL}://${HOSTNAME}:${PORT}`);
   

})