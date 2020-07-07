const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT  = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

const User = require('./Routes/user');
const Exercise = require('./Routes/exercise');
const Assign = require('./Routes/assigning');

//Local database connection medicloq_ambulance
mongoose.connect('mongodb://localhost:27017/profiles',{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true })
.then(()=>console.log("MongoDB connected successfully" ))
.catch(err=>console.log(err))


//base route
app.use('/user',User);
app.use('/exercise',Exercise);
app.use('/assign',Assign);

//listning ports
app.listen(PORT,function()
{
    console.log("Server is running on the PORT : " +PORT);
})