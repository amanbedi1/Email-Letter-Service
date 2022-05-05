const nodemailer = require("nodemailer");

const sendMail = async(message_subject,message_html,recipents_list)=>{
  
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAIL_USERNAME, // generated gmail user
          pass: process.env.EMAIL_PASSWORD, // generated gmail password
        }
      });
      
    let mail = {
        from: `Aman Bedi ${process.env.EMAIL_USERNAME}`,
        to: recipents_list ,
        subject:message_subject,
        html: message_html,
      };

      transport.sendMail(mail, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });    
}

module.exports = sendMail;
