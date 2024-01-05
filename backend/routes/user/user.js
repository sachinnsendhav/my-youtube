const express = require('express');
const userrouter = express.Router();
const usercontroller = require('../../controller/user/user');

userrouter.post('/user/signup', usercontroller.signup);
userrouter.post('/user/login',usercontroller.login)
userrouter.put('/updateUser/:userId',usercontroller.updateUserDetail)
module.exports = userrouter;