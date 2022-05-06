const mongoose = require('mongoose'); 

const topicSchema = new mongoose.Schema({
    userMails:[{
        type:String,
    }]
});

const Topic = mongoose.model("Topics",topicSchema);
module.exports=Topic;