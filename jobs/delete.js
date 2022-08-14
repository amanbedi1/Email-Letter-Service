const { default: mongoose } = require('mongoose');
const Content = require('../models/content.js');
const maxTime = require('../const.js');

const CONNECTION_URL = process.env.CONNECTION_URL; 

const deleteContents = async()=>{
    try{
        await mongoose.connect(CONNECTION_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
        await Content.deleteMany({scheduledTime:maxTime}).exec();
    } catch(err){
        console.log(`DELETE CRON ERROR MESSAGE: ${err}`);
    } finally{
        await mongoose.connection.close();
    }
}
(async()=>{
    await deleteContents(); 
    process.exit(0);
})();

