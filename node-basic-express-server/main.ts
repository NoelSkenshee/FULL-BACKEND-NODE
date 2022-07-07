import { Service } from "./server";
const {SERVER,PORT,HOSTNAME}=Service;

SERVER.listen(PORT,HOSTNAME,()=>{
    console.log(`ESCUCHANDO SERVIDOR DESDE : http://${HOSTNAME}:${PORT}`);
    
})