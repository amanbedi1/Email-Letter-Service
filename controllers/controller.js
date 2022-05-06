const Topic = require('../models/topic.js'); 
const Content = require('../models/content.js');
const utils = require('../utils.js'); 

const addSubscriber = async(req,res)=>{
    const {subscribers} = req.body; 

    const topic_set = new Set();

    subscribers.forEach((obj)=>{
        topic_set.add(obj.topic);
    });
    
    

}


// Controller to add Content in Database
const addContent = async(req,res)=>{
    const {subject,html,topics,time} = req.body; 

    const time_stamp = utils.toTimestamp(time);

    if(!utils.isValid(time_stamp)){
        return res.status(401).json({message:"Scheduled Time is in Past"});
    }
    
    if(!topics || !topics.length){
        return res.status(401).json({message:"Content have to be of a particular topic"});
    }

    const content_details={
        contentSubject : subject, 
        contentHTML : html,
        topics : topics, 
        scheduledTime : time_stamp,
    }; 

    const content = new Content(content_details);

    content.save((err)=>{
        if(err){
            console.log(err);
            return res.status(404).json({message:"Bad Request"});  
        } 
        return res.status(201).json({mesage:"Successfully Added"});
    });
}

module.exports={
    addContent,
}