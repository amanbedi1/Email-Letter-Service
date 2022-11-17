const nodemailer = require("nodemailer");

const sendMail = async(job)=>{
    
    const subject = job.data.subject; 
    const body = job.data.body; 
    const recipent = job.data.mailId; 

    const transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'madalyn11@ethereal.email',
            pass: 'bg9HFJVdU7YtXwCpFY'
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
            console.log("I failed EMAIL");
        } else {
            console.log('Email sent: ' + info.response);
        }
        });    
}

module.exports = sendMail;
