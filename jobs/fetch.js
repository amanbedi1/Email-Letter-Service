const { default: mongoose } = require('mongoose');
const Content = require('../models/content.js');
const Queue = require('bull');

const CONNECTION_URL = process.env.CONNECTION_URL; 

const topicEmailQueue  = Queue("topicEmailQueue",{
    redis:{
        host : "localhost",
        port : process.env.REDIS_PORT,
    }
}); 

const fetchContents = async()=>{
    try{
        await mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const currentTime = new Date().getTime();
        console.log(currentTime);
        const data = await Content.find({scheduledTime:{$lte:currentTime}}).exec();
        // console.log(data);
        
        if(!data || !data.length){
            return;
        }
        
        for(let i=0;i<data.length;++i){
            for(topic of data[i].topics){
                await topicEmailQueue.add({topic:topic,subject:data[i].contentSubject,body:data[i].contentBody});
            }
            data[i].scheduledTime = 8640000000000000;
            await data[i].save(); 
        } 

    } catch(err){
        console.log(err); 
    } finally{
        await mongoose.connection.close();
    }
}; 

(async()=>{
    await fetchContents(); 
    process.exit(0);
})();

