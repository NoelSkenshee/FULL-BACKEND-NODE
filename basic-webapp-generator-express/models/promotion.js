const  mongoose =require("mongoose");
const Schema=mongoose.Schema;

const PromoSchema=new Schema(

 {
      "name": {
        type:String,
        required:true
      },
      "image": {
        type:String,
        required:true  
      },
      "label": {
        type:String,
        required:true
      },
      "price": {
        type:Number,
        required:true
      },
      "description": {
        type:String,
        required:true
      },
      "featured": {
        type:String,
        required:true
      }
},
{
    timestamps:true,
});

module.exports={
   PromoModel: mongoose.model("Promotions",PromoSchema)
};
