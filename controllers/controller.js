const Topic = require('../models/topic.js'); 
const Content = require('../models/content.js');
const utils = require('../utils.js'); 


// Controller to add email of subscriber
const addSubscriber = async(req,res)=>{
    const {topic,user_mail} = req.body; 

    if(!topic){
        return res.status(401).json({message:"Topic can't be empty"});
    } 

    if(!user_mail){
        return res.status(401).json({message:"User Email is required"});
    }
    
    try{
        const t = await Topic.findOne({topic:topic}).exec(); 
        if(!t){
            const topic_obj = new Topic({topic:topic,userMails:[user_mail]});
            try{
                await topic_obj.save(); 
            } catch(err){
                console.log(err);
                return res.status(401).json({message:"Something went wrong Please try again later"});
            }
        } else{
            try{
                await Topic.findOneAndUpdate(
                    {topic:topic},
                    {$addToSet : {userMails:user_mail}},
                ).exec();
            } catch(err){
                console.log(err);
                return res.status(401).json({message:"Something went wrong Please try again later"});
            }
        }
        return res.status(201).json({message:"Successfully Added"});
    } catch(err){
        console.log(err);
        return res.status(401).json({message:"Something went wrong Please try again later"});
    }

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
    addSubscriber,
    addContent,
}