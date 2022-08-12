require('dotenv').config();
const express = require('express'); 
const cors = require('cors'); 
const dbConnector = require("./connection.js");
const routes = require('./routes/routes.js');
const Queue = require('bull');
const path = require('path');
const Bree = require('bree');

const app = express(); 

const PORT=process.env.PORT;

// cors,url-encoding
app.use(cors()); 
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));

// database connection 
dbConnector(); 

// API Routes
app.use('/',routes);

// Base API
app.get('/',(_,res)=>{
    res.send("<h1>Welcome to Email Letter Service</h1>");
})


// Cron job to fetch database for scheduled email
const bree = new Bree({
    jobs:[
        {
            name:'fetch', 
            interval:'40s',
            timeout:'10s',
        },
    ]
});

(async () => {
    await bree.start();
  })();
  



// Message Queue for relation bw topic and Content
const topicEmailQueue = new Queue("topicEmailQueue",{
    redis:{
        host : "localhost",
        port : process.env.REDIS_PORT,
    }
});
topicEmailQueue.process(2,path.resolve(__dirname,"workers/topic_worker.js"));

topicEmailQueue.on('completed',(job)=>{
    console.log(`completed my content topic queue job with job id as ${job.id}`)
});
topicEmailQueue.on("failed",(_job,result)=>{
    console.log(`Content Topic Queue failed with log ${result}`);
}); 


// // Message Qeueue that contains email id and mails to send;
const emailQueue = new Queue("emailQueue",{
    redis:{
        host:"localhost", 
        port:process.env.REDIS_PORT,
    }
});
emailQueue.process(2,path.resolve(__dirname,"workers/email_worker.js"));

emailQueue.on("completed",(job)=>{
    console.log(`completed my email queue job with job id ${job.id}`)
    // job.remove();
});
emailQueue.on("failed",(_job,result)=>{
    console.log(`Email Queue job failed with log ${result}`);
});


// Listening to Application
app.listen(PORT,()=>{
    console.log(`Listening to App at http://localhost:${PORT}`);
}); 


