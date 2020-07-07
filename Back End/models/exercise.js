const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }
   
})

module.exports= Exercise = mongoose.model('exercise',ExerciseSchema);