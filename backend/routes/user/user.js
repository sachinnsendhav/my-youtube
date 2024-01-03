const express = require('express');
const userrouter = express.Router();
const usercontroller = require('../../controller/user/user');

userrouter.get('/user/signup', usercontroller.signup);
module.exports = userrouter;