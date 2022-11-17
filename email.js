const nodemailer = require("nodemailer");

const sendMail = async(subject,body,recipent)=>{
  
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAIL_USERNAME, // generated gmail user
          pass: process.env.EMAIL_PASSWORD, // generated gmail password
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
