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
    role:{
        type: Array,
        default : []
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})

const Playlist = mongoose.model('Playlist',playlistShema);
module.exports = Playlist;