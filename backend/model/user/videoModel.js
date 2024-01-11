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
    playListId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;