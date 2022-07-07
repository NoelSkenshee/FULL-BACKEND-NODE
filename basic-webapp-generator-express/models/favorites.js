const mongoose = require("mongoose");
const mongooselp = require("passport-local-mongoose");
const { DishSchema } = require("./Dishe");
const Schema = mongoose.Schema;


const Favorite_Schema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "userpassport",
   },
   favorite_dishes: [{
      type: Schema.Types.ObjectId,
      ref: "Dishes",
   }]
}, { timestamps: true });

Favorite_Schema.plugin(mongooselp);


module.exports.Favorite_Model = mongoose.model("Favorites", Favorite_Schema);

