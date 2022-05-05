require('dotenv').config();
const express = require('express'); 
const cors = require('cors'); 
const sendMail = require('./email.js'); 

const app = express(); 

const PORT=process.env.PORT;

app.use(cors()); 
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));

app.get('/',(req,res)=>{
    res.send("<h1>Hello World</h1>");
});

app.get('/send_email',async (req,res)=>{
    await sendMail("Greeting","<h1>Nice Meeting You<h1>",['bedi23aman@gmail.com','notification.amanbedi@gmail.com']);
    res.send("MAIL SENT");
});

app.listen(PORT,()=>{
    console.log(`Listening to App at http://localhost:${PORT}`);
}); 

