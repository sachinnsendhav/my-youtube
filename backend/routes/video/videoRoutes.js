const express = require('express');
const videorouter = express.Router();
const videoController = require('../../controller/video/video');
const auth = require('../../middleware/auth');

videorouter.post('/video/uploadData',auth, videoController.video);
module.exports = videorouter;