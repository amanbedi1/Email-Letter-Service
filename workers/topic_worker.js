const Queue = require("Bull");
const { default: mongoose } = require("mongoose");
const emailQueue =  Queue("emailQueue");
const Topic = require('../models/topic.js');
const CONNECTION_URL = process.env.CONNECTION_URL; 


const fetchEmailsFromTopic = async(job)=>{
    const {topic,subject,body} = job.data; 
    try{
        mongoose.connect(CONNECTION_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
        const data = await Topic.findOne({topic:topic},'userMails').exec(); 
        const emails = data.userMails;
        if(!emails){
            return ;
        }
        for (email of emails){
            await emailQueue.add({mailId:email,body:body,subject:subject});
        }
    } catch(err){
        console.log(err);
    } finally{
        mongoose.connection.close();
    }
    return;
}

module.exports=fetchEmailsFromTopic;