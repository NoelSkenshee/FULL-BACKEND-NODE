import {HOST, PORT, SERVER} from "./server";


SERVER.listen(PORT,HOST,()=>{
    console.log(`Escuchando el servidor en :${HOST}:${PORT}`);
    
})

