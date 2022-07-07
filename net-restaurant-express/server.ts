import http from "http";
import express from "express";
const APP = express();

import dishRoute from "./Routes/dishRoute";
import leaderRoute from "./Routes/leaderRoute";
import promoRoute from "./Routes/promoRoute";

const {
  route_dish,
  route_leader,
  route_promo,
  route_names_dish,
  route_names_leader,
  route_names_promo,
} = { ...dishRoute, ...leaderRoute, ...promoRoute };

//dishes and id
APP.use(route_names_dish.name,route_dish);

//leaders and id
APP.use(route_names_leader.name,route_leader);

//promo and id
APP.use(route_names_promo.name,route_promo);


const SERVER=http.createServer(APP);


export default{
    SERVER,
    PORT:9090,
    HOSTNAME:"localhost",
    PROTOCOL:"http"
}