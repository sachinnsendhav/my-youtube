const mongoose = require('mongoose');

const playlistShema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true,
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})

const Playlist = mongoose.model('Playlist',playlistShema);
module.exports = Playlist;