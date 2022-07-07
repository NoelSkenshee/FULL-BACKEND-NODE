const { default: mongoose } = require("mongoose");

 const Services= {


   /**************************************************************************************************************************
    * 
    * 
    * 
    *************************************************************************************************************************/


   connectDB: () => {
      const dbHost = "mongodb://localhost:27017/Dishes";
      return mongoose.connect(dbHost)
   },
   SECRET:"---------------JKSDF,KHDFJSDHFSMDBFNSDBFSDHNFSFFS-FFASDDSGASDS///**********",
   EXPIRE_TIME:"10M",
   CLIENT_ID_FACEBOOK:"1189703188256637",
   CLIENT_SECRET_FACEBOOK:"bde014bd7c5c6e23365d842db7eecf99",
   disconnectDB: () => {
      return mongoose.disconnect()
   },
   dbOperationError: (err, res) => {
      Services.disconnectDB()
      res.statusCode = 404;
      res.json({ error: true, message: err, data: null }
      )
   },

   dbConnectionError: (err, res) => {
      res.statusCode = 500;
      console.log("ERROR TRYING TO CONNECT DB ::", err);
      res.json({ error: true, message: "Cant connect to the database", data: null })
   }


   /********************************************************************************************************************
    * 
    * 
    * 
    * 
    **********************************************************************************************************************/

};
module.exports=Services;
