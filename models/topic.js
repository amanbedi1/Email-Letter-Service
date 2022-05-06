const mongoose = require('mongoose'); 

const topicSchema = new mongoose.Schema({
    topic:{
        type:String,
        unique:true,
    },
    userMails:[{
        type:String,
    }]
});

const Topic = mongoose.model("Topics",topicSchema);
module.exports=Topic;