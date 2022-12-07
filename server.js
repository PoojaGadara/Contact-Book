const express = require("express");
const web = require('./routes/web') 
const auth = require('./middleware/auth')
require('dotenv').config({ path: "config.env" });
const app = express();
const bodyParser=require('body-parser') 
const port =process.env.port || '3000'
const mongoose= require('mongoose');

//Body parser for parsing data
app.use(bodyParser.json())  

//Route config file
app.use('/' ,web)

//Database connectivity
const DataBaseConnection = () => {
    mongoose.connect(process.env.DATABASE,{
        useUnifiedTopology:true,
        useNewUrlParser: true,
    }).then((data) => {
        console.log(`mongoDB connect with host:${data.connection.host}`)
    })
}
try{
    DataBaseConnection()
}catch(err){
    console.log('error accure when connect to database')
}

//Server Lishen
app.listen(port , () => {
    console.log(`server listen on ${port}`);
})