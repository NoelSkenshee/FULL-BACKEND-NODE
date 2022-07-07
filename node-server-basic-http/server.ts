import * as http from "http";
import { Services } from "./service";

const HOST = "localhost",
  PORT = 3040,



  SERVER = http.createServer((req, res) => {
    if (req.method != "GET") {
      Services.error400(res, `El metodo ${req.method} No esta autorizado`);
    } else {
      let fileUrl: string = "public/";
      if (req.url == "/" || req.url == "/index.html") {
        Services.sendFile(res, fileUrl, "index.html");
      } else if (req.url == "/aboute" || req.url == "/aboute.html") {
        Services.sendFile(res, fileUrl, "index.html");
      } else {
        Services.error400(
          res,
          `Losentimos pero no encontramos este recurso en ${req.url}`
        );
      }
    }
  });

export { SERVER, HOST, PORT };
