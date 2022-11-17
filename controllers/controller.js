const Topic = require('../models/topic.js'); 
const Content = require('../models/content.js');
const utils = require('../utils.js'); 


// Controller to add email of subscriber
const addSubscriber = async(req,res)=>{
    // console.log(req.body.topic); 
    // console.log(req.body.user_mails);
    if(!req.body.topic || !req.body.user_mails){
        return res.status(401).json({message:"Invalid Request"});
    } 
    
    const topic = utils.normalize(req.body.topic);
    const user_mails = utils.normalizeArray(req.body.user_mails);

    if(!topic || !topic.length){
        return res.status(401).json({message:"Topic can't be empty"});
    }
    if(!user_mails){
        return res.status(401).json({message:"User Email is required"});
    }
    try{
        await Topic.updateOne({topic:topic},{
            $addToSet:{userMails:{$each:user_mails}}},{upsert:true}
        ).exec();
        return res.status(201).json({message:"Successfully Added"});
    } catch(err){
        console.log(err);
        return res.status(401).json({message:"Something went wrong Please try again later"});
    }
}

// Controller to add Content in Database
const addContent = async(req,res)=>{
    if(!req.body.subject || !req.body.body || !req.body.topics || !req.body.time){
        return res.status(401).json({message:"Invalid Request"});
    }

    const {subject,body,time} = req.body; 

    let topics = utils.normalizeArray(req.body.topics);

    const time_stamp = utils.toTimestamp(time);

    if(!utils.isValid(time_stamp)){
        return res.status(401).json({message:"Scheduled Time is in Past"});
    }
    if(!topics || !topics.length){
        return res.status(401).json({message:"Content have to be of a particular topic"});
    }
    if(!body.length){
        return res.status(401).json({message:"Body can't be empty"});
    }

    const content_details={
        contentSubject : subject, 
        contentBody : body,
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


// Testing/Experimental Controllers
const fetchContent = async(_req,res)=>{
    try{
        const data  = await Content.find({}); 
        return res.status(200).json({message:"Success",Object:JSON.stringify(data)}); 
    } catch(err){
        console.log(err);
        return res.status(300).json({message:"Error Occured"});
    } 
}
const updateTime = async(req,res)=>{
    const time = utils.toTimestamp(req.query.time); 

    if(!utils.isValid(time)){
        return res.status(404).json({message:"Time is in past"});
    }

    try{
        await Content.updateMany({"scheduledTime":{$gte:0}},{"$set":{"scheduledTime":time}}).exec();
        console.log("Successfully Added");
        return res.status(200).json({status:"Success","message":"OK"});
    } catch(err){
        console.log(err);
        return res.status(404).json({status:"Failed","Error":err});
    }

}
const findMails = async(req,res)=>{
    const topic = req.query.topic; 

    try{
        const data = await Topic.find({topic:topic},{userMails:1}).exec();
        return res.status(200).json({status:"success",mails:data[0].userMails});
    } catch(err){
        console.log(err); 
        return res.status(400).json({status:"failed",message:"Some error occured"});
    }
}

module.exports={
    addSubscriber,
    addContent,
    fetchContent,
    updateTime,
    findMails
}
