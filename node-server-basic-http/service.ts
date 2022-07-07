import * as http from 'http';
import path from 'path/posix';
import * as fs from 'fs';
export const Services={
    sendFile:(res:http.ServerResponse,filePath:string,file_:string)=>{
        res.statusCode=200;
        res.setHeader("content-type","text/html");
        const file=path.resolve(filePath+file_);
        if(fs.existsSync(file)){
        fs.createReadStream(file).pipe(res)
        }else{
            res.statusCode=400;
            console.log("No encontramos el archivo :"+file);
        }
    },
    error400:(res:http.ServerResponse,message:string)=>{
        res.statusCode = 400;
        res.setHeader("content-type", "text/html");
        res.end(`<html><head><title>Error 400 :(</title></head><body></body><h1>${message}</h1></html>`);
    }
}