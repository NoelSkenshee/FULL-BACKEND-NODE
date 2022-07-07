/*import yargs from "yargs/yargs";
import {hideBin} from "yargs/helpers"
const argv=yargs(hideBin(process.argv)).argv;*/
import dbtrans from "./db_manager/db_transactions";

(async () => {
  /* dbtrans.setUser({ 
      name:"Maria",
      lastname:"Dolores",
      phone: "+18494456789",
      email: "maria-gmail.com",
      image: "urlimage:----------",
      address:"Colombia"});*/
  // dbtrans.upUser({name:"Maria"},{lastname:"Alcantara"})
   dbtrans.getAll()
  //dbtrans.deleteUsers()
 /* dbtrans.setContact("62a4c29f58485560e3951051", {
    name: "Maria",
    lastname: "Dolores",
    phone: "+18494456789",
    email: "maria-gmail.com",
    image: "urlimage:----------",
    address: "Colombia",
  });*/
})();
