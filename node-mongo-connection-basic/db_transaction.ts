import { Db } from "mongodb";
export default {
  setDoc: (DB: Db | undefined, collectionName: string, doc: any) =>
    DB?.collection(collectionName).insertOne(doc),

  getAllDoc: (DB: Db | undefined, collectionName: string) =>
    DB?.collection(collectionName).find().toArray(),

  getDocumentBy: (DB: Db | undefined, matchOBJ: any, collectionName: string) =>
    DB?.collection(collectionName).findOne(matchOBJ),

  putDoc: (
    DB: Db | undefined,
    collectionName: string,
    matchDoc: any,
    newDoc: any
  ) => DB?.collection(collectionName).updateOne(matchDoc, { $set: newDoc }),

  deleteBy: (DB: Db | undefined, collectionName: string, matchDoc: any) =>
    DB?.collection(collectionName).deleteOne(matchDoc),
};
