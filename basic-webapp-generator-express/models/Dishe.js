const  mongoose =require("mongoose");
//require("mongoose-currency").loadType(mongoose);
//const currency = mongoose.Types.currency;*/
const Schema = mongoose.Schema;

const ComentsSchema = new Schema({
  
    "rating": {
        type:Number,
        min:1,
        max:5,
        required:true
    },
    "comment":{
        type:String,
        min:25,
        max:200,
        required:true
    },
    "author": {
        type:String,
         required:true
    }
}, {
    timestamps: true
});



const DishSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "category": {
        type: String,
        required: true
    },
    "label": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "featured": {
        type: String,
        reuired: true
    },
    "description": {
        type: String,
        required: true,
        min: 100,
        max: 1000
    },
    "comments": [ComentsSchema],

    //forain key
    favorite:{
       type:Schema.Types.ObjectId,
       ref:"Favorites"
    }
}, { timestamps: true });




const DishModel = mongoose.model("Dishes", DishSchema);



module.exports= {
    DishModel,
    DishSchema
};