const mongoose = require('mongoose'); 

const contentSchema = new mongoose.Schema({
    contentSubject:{
        type:String,
    },
    contentBody:{
        type:String, 
    },
    topics:[{
        type:String, 
    }], 
    scheduledTime:{
        type:Number,
    },
}); 

const Content = mongoose.model("Content",contentSchema);

module.exports=Content;