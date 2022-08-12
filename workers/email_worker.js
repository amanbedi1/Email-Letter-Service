const sendMail = require('../email.js');
const sendMailToUser = async(job)=>{
    await sendMail(job.data.subject,job.data.body,job.data.mailId);
    return;
}  

module.exports = sendMailToUser;