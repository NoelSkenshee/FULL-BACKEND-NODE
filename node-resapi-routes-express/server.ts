import http from "http";
import express from "express";
import morgan from "morgan";
import body_parser from "body-parser";

import rout_student from "./routes/estudiantes";
import rout_teacher from "./routes/maestro";

//Express app init
const APP = express();

//file static services
APP.use(morgan("dev"));

//PARSE DATA COMUNICATION WITH FORMAT JSON
APP.use(body_parser.json());

//Set routes
APP.use(rout_student.name, rout_student.route_estudiantes).use(
  rout_teacher.name,
  rout_teacher.route_maestro
);

//serve static files
APP.use(express.static(__dirname + "public"));

const SERVER = http.createServer(APP);

export default {
  HOSTNAME: "localhost",
  PROTOCOL:"http",
  PORT: 9099,
  SERVER,
};
