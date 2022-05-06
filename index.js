require('dotenv').config();
const express = require('express'); 
const cors = require('cors'); 
const sendMail = require('./email.js'); 
const dbConnector = require("./connection.js");
const routes = require('./routes/routes.js');


const app = express(); 

const PORT=process.env.PORT;

app.use(cors()); 
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));

dbConnector(); 

app.use('/',routes);

app.listen(PORT,()=>{
    console.log(`Listening to App at http://localhost:${PORT}`);
}); 

