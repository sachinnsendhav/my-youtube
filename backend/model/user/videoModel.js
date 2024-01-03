const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoName: {
    type: String,
    required: true,
},
videoDescription: {
    type: String,
    required:true
},
videoUrl: {
    type: String,
    required:true
},
videoTags: {
    type: String,
    required:true
},
category: {
    type: String,
    required:true
},
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;