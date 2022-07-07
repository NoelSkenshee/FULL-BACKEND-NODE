const App  = require("./apps/app").App;
const {HOST,PORT,PROTOCOLE}=require("./services/config").ServerInfo;









App.listen(PORT,HOST,()=>{
  console.log(`Litening at :${PROTOCOLE}://${HOST}:${PORT}`);
})