const express = require('express');
const auth = require('../../middleware/auth');
const playlistrouter = express.Router();
const playlistcontroller = require('../../controller/playlist/playlist');

playlistrouter.post('/playlist/addPlaylist', auth, playlistcontroller.addPlaylist);

module.exports = playlistrouter;