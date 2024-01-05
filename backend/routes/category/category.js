const express = require('express');
const auth = require('../../middleware/auth');
const categoryrouter = express.Router();
const categoryController = require('../../controller/category/category');

categoryrouter.post('/category/addCategory', auth, categoryController.addCategory);

module.exports = categoryrouter;