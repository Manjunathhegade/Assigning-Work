const express = require('express');
const exercise = express.Router();
const cors = require('cors');
const exerciseController = require('../controllers/exercise');

exercise.use(cors())

//user register
exercise.post('/exerciseRegister',exerciseController.exercise_Register)

//get user
exercise.get('/getExercise',exerciseController.get_exercise)

//delete user
exercise.delete('/deleteExercise/:id',exerciseController.delete_exercise)

//get user by id
exercise.get('/getExerciseById/:id',exerciseController.get_exerciseById)

//edit user
exercise.post('/editExercise/:id',exerciseController.edit_exercise)



module.exports = exercise