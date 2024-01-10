const express = require('express');
const auth = require('../../middleware/auth');
const userrouter = express.Router();
const usercontroller = require('../../controller/user/user');

userrouter.post('/user/signup', usercontroller.signup);
userrouter.post('/user/login',usercontroller.login)
userrouter.put('/updateUser/:userId',usercontroller.updateUserDetail)
userrouter.post('/user/addUser', auth, usercontroller.addUsers)
userrouter.delete('/user/deleteUser/:id', auth, usercontroller.deleteUser);
userrouter.get('/usersByAdminId',auth,usercontroller.getAllUserByparentId)
module.exports = userrouter;