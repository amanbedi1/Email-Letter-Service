const mongoose = require('mongoose'); 

const contentSchema = new mongoose.Schema({
    contentSubject:{
        type:String,
    },
    contentHTML:{
        type:String, 
    },
    topics:[{
        type:String, 
    }], 
    scheduledTime:{
        type:Number,
    }
}); 

const Content = mongoose.model("Content",contentSchema);

module.exports=Content;