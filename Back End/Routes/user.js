const express = require('express');
const user = express.Router();
const cors = require('cors');
const userController = require('../controllers/user');

user.use(cors())

//user register
user.post('/userRegister',userController.user_Register)

//get user
user.get('/getUser',userController.get_User)

//delete user
user.delete('/deleteUser/:id',userController.delete_User)

//get user by id
user.get('/getUserById/:id',userController.get_UserById)

//edit user
user.post('/editUser/:id',userController.edit_User)



module.exports = user