const nodemailer = require("nodemailer");

const sendMail = async(job)=>{
    
    const subject = job.data.subject; 
    const body = job.data.body; 
    const recipent = job.data.mailId; 

    const transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jaycee28@ethereal.email',
            pass: 'kCmcqufjng9kQVSNmw'
        }
    });
        
    let mail = {
        from: `Aman Bedi ${process.env.EMAIL_USERNAME}`,
        to: recipent ,
        subject:subject,
        html: body,
        };

        transport.sendMail(mail, function(error, info){
        if (error) {
            console.log(error);
        } else {
            // console.log('Email sent: ' + info.response);
        }
        });    
}

module.exports = sendMail;
