const { connect, disconnect } = require("mongoose");

const STR_CONFIG={
    dbhost : "mongodb://localhost:27017/Diches",
    JWT:{
        SEAD:"----*************-----------1234635736537-----------DJKSDGJHSVSVHVS<VNVHGS",
        EXPIRES_IN:100000
    }
};

module.exports.JWT=STR_CONFIG.JWT;

module.exports.DB = {

    connectDb: () => {
        let dbhost = STR_CONFIG.dbhost;
        return connect(dbhost)
    },
    disconnectDb: () => {
        return disconnect()
    }

};

module.exports.MessageResponse={
    errorManager: (err, res, code) => {
        res.statusCode = code;
        res.setHeader("Content-Type", "application/json");
        res.json({ error: true, message: err, data: null })//data:null ise for consistence
    },
    successManager:(message,res,code,data)=>{
        res.statusCode = code;
        res.setHeader("Content-Type", "application/json");
        res.json({ error: false, message, data }) 
    }
};


module.exports.Messages={
    userReadyExist:"User ready register",
    field_missin:"Fields missing",
    created_message:"User created successfuly",
    ready_logedIn:"Session ready open",
    new_session:"You are loged in",
    not_logedin:"You are not loged in",
    oute_session:"You are oute",
    notauth:"Not authorized"

    
};


module.exports.statusCode={
    badReq:400,
    notFound:404,
    created:201,
    serverError:500,
    success:200
};

module.exports.ServerInfo={
    PORT:3000,
    HOST:"localhost",
    PROTOCOLE:"http",
};



