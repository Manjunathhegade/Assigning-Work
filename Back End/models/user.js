const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:String,
        required:true
    }
    
})

module.exports= User = mongoose.model('user',UserSchema);