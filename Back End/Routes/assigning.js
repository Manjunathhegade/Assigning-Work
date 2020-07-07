const express = require('express');
const assign = express.Router();
const cors = require('cors');
const assignController = require('../controllers/assigning');

assign.use(cors())

// posing assign
assign.post('/assignExercise',assignController.assign_exercise)

// get Work
 assign.get('/getAssinedExercise',assignController.get_assined_exercise)

// delete work
assign.delete('/deleteWork/:id',assignController.delete_assirned_exercise)

//get work by id
assign.get('/getexerciseByUserId/:userid',assignController.get_assirned_exercise_BY_id)




module.exports = assign