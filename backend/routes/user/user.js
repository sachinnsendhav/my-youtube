const express = require('express');
const auth = require('../../middleware/auth');
const userrouter = express.Router();
const usercontroller = require('../../controller/user/user');

userrouter.post('/user/signup', usercontroller.signup);
userrouter.post('/user/login',usercontroller.login)
userrouter.patch('/user/updatePassword',auth,usercontroller.updatePassword)
userrouter.post('/forgetPasswordMail',usercontroller.forgetPassword)
userrouter.post('/forgetPasswordSave',usercontroller.forgetPasswordSave)
userrouter.put('/updateUser/:userId',usercontroller.updateUserDetail)
userrouter.post('/user/addUser', auth, usercontroller.addUsers)
userrouter.delete('/user/deleteUser/:id', auth, usercontroller.deleteUser);
userrouter.get('/usersByAdminId',auth,usercontroller.getAllUserByparentId)
userrouter.post('/generateOtp',usercontroller.verify)
module.exports = userrouter;