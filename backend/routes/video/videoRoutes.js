const express = require('express');
const videorouter = express.Router();
const videoController = require('../../controller/video/video');
const auth = require('../../middleware/auth');
const subscription = require('../../middleware/subscription');

videorouter.post('/video/uploadData',auth, subscription, videoController.video);
videorouter.get('/video/getData/:playListId', videoController.getVideo);
videorouter.get('/video',auth, videoController.getAllVideos)
videorouter.delete('/video/delete/:videoId', auth, subscription, videoController.deleteVideo)
module.exports = videorouter;