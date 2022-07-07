const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const LeaderSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "designation": {
        type: String,
        required: true
    },
    "abbr": {
        type: String,
        required: true
    },
    "description": {
        type: String,
        required: true,
        min: 100,
        max: 1000
    },
    "featured": {
        type: String,
        required: true
    }
}
);

module.exports={
    LeaderModel:mongoose.model("Leaders",LeaderSchema)
}