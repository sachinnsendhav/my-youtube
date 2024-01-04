const express = require('express');
const videorouter = express.Router();
const videoController = require('../../controller/video/video');

videorouter.post('/video/uploadData', videoController.video);
module.exports = videorouter;