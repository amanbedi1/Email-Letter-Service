const { default: mongoose } = require('mongoose');
const Content = require('../models/content.js');
const Topic = require('../models/topic.js');
const Queue = require('bull');
const maxTime = require('../const.js');

const CONNECTION_URL = process.env.CONNECTION_URL; 

const emailQueue = new Queue("emailQueue",{
    redis:{
        host:"localhost", 
        port:process.env.REDIS_PORT,
    }
});

const fetchContents = async()=>{

    try{

        await mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const currentTime = new Date().getTime();
        const data = await Content.find({scheduledTime:{$lte:currentTime}}).exec();
        // console.log(data);
        
        if(!data || !data.length){
            return;
        }
        console.log(data);
        for(let i=0;i<data.length;++i){
            const res = await Topic.find().distinct('userMails',{topic:{$in:data[i].topics}}).exec(); 

            let promises = []; 
            
            for(let j=0;j<res.length;++j){
                promises.push(emailQueue.add({subject:data[i].contentSubject,body:data[i].contentBody,mailId:res[j]}));
            }

            await Promise.all(promises)
            data[i].scheduledTime = maxTime; 
            await data[i].save(); 
            console.log(`Success for ${i}`);
        } 

    } catch(err){
        console.log("ERROR PRODUCED",err); 
    } finally{
        await mongoose.connection.close();
    }
}; 

(async()=>{
    await fetchContents(); 
    process.exit(0);
})();

