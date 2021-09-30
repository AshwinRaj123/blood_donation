const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config()

const app = express();
const port =  8800;
const uri = process.env.URI;

const bdRouter = require('./routes/bloodtype');
const router = require('./routes/donorDetails');

//Connecting to mongodb with thr URI

mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true,useFindAndModify:false});

const connection = mongoose.connection;
//updateActiveDonor();
app.listen(port,()=>{
    try{
        console.log(`App is Listening to the port ${port}`)
    }catch(err){
        throw err.port
    }
    
})

connection.once('open',()=>{
    console.log('Mongoose DB connected successfullt')
})

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/type', bdRouter);
app.use('/donor',router)


