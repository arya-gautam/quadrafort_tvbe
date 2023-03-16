const mongoose = require("mongoose");
const  validator = require("validator");


const dataSchema = new mongoose.Schema({
    filetype :{
        type:String,
        required:[true,"The File Type Is Required."],
    },
    fileURL:{
        type:String,
        required:[true,"The File Is Required."],   
    },
});

const dataModels = new mongoose.model("quadrafortTvApp",dataSchema);
module.exports = dataModels;