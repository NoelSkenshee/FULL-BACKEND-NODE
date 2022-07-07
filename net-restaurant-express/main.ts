import server from "./server";

const {SERVER,HOSTNAME,PORT,PROTOCOL}=server;


SERVER.listen(PORT,HOSTNAME,()=>{
    console.log(`API BASE URL : ${PROTOCOL}://${HOSTNAME}:${PORT}`);
    
})