import * as mongo from "mongodb";
import assert from "assert";
import transDb from "./db_transaction";

const { setDoc, getAllDoc, getDocumentBy, putDoc, deleteBy } = transDb;

const URLDB = "mongodb://127.0.0.1:27017/";
const DBNAME = "net-restaurant-express";
const CLIENT = mongo.MongoClient;
const colectName = "dishes";

CLIENT.connect(URLDB)
  .then(async (clt) => {
    const db = clt?.db(DBNAME),
      doc = {
        name: "test1",
        description: "test2",
        image: "",
        price: 0,
        oferta: {
          description: "",
          descuento: 0,
        },
      };

    const res = await setDoc(db, colectName, doc);
    if (!res) return console.log("Someting was wrong");
    console.log(res, "------------------------1");
    const resUpdate = putDoc(
      db,
      colectName,
      { id: "62a3b462059a55655d1fbcd8" },
      { name: "Jose Ana" }
    );
    if (!resUpdate) return console.log("Someting was wrong 2");
    console.log(await resUpdate, "+++++++++++++++++++2");
    const listDish = getAllDoc(db,colectName);
    if (!listDish) return console.log("Someting was wrong 3");
    console.log((await listDish), "+++++++++++++++++++3");
  })
  .catch((err) => {});
