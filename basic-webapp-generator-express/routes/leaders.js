const express = require("express");
const { verify,verifyAdmin } = require("../Auth_congig");

const { connectDB, dbConnectionError, dbOperationError, disconnectDB } = require("../config/config");
const { corsOriginFilter, cors } = require("../config/corsconfiguration");
const { LeaderModel } = require("../models/leader");

const ROUTE_LEADER = express.Router();

ROUTE_LEADER.route("/")
    .all(
        (req, res, next) => {
         res.setHeader("content-type","application/json")
         if(req.method=="PUT"||req.method=="DELETE"){
         res.statusCode=404;
         return res.json({error:true,message:"This operation required an Id",data:null})
         }
         res.statusCode=200;
         next()
        }
    )
    .post(corsOriginFilter,verify,verifyAdmin,
        (req, res) => {
          connectDB().then(()=>{
            LeaderModel.create(req.body).then(()=>{
                disconnectDB()
                res.statusCode=201;
                res.json({error:false,message:"Document aded succesfuly",data:null})
            }).catch((err)=>dbOperationError(err,res))
          }).catch((err)=>dbConnectionError(err,res))
        }
    )
    .get(cors,verify,
        (req, res) => {
          connectDB().then(()=>{
             LeaderModel.find({}).then((data)=>{
                disconnectDB()
                res.statusCode=200;
                res.json({error:false,message:"All documents",data})
             }).catch((err)=>dbOperationError(err,res))
          }).catch((err)=>dbConnectionError(err,res))
        });

//DANGER SEC1
ROUTE_LEADER.route("/:leaderId")
    .all(
        (_, res,next) => {
           res.setHeader("content-type","application/json")
           next()
        }
    )
    .put(corsOriginFilter,verify,verifyAdmin,
        (req, res) => {
          connectDB().then(()=>{
             const leaderId=req.params.leaderId;
             LeaderModel.findByIdAndUpdate(leaderId,req.body,{new:true}).then((data)=>{
              disconnectDB()
              res.statusCode=201;
              res.json({error:false,message:`Document ${leaderId} updated`,data})
             }).catch((err)=>dbOperationError(err,res))
          }).catch((err)=>dbConnectionError(err,res))
        }
    )
    .delete(corsOriginFilter,verify,verifyAdmin,
        (req, res) => {
             connectDB().then(()=>{
              const leaderId=req.params.leaderId;
              LeaderModel.findByIdAndRemove(leaderId).then(()=>{
                 disconnectDB();
                 res.setStatusCode=200;
                 res.json({error:false,message:`Document ${leaderId} removed successfuly`,dta:null}) 
              }).catch((err)=>dbOperationError(err,res))
             }).catch((err)=>dbConnectionError(err,res))
        }
    );

module.exports = {
    route_name_leader: {
        name: "/leaders"
    },
    route_leader: ROUTE_LEADER
}
