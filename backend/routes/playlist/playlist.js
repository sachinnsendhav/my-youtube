const express = require('express');
const auth = require('../../middleware/auth');
const playlistrouter = express.Router();
const playlistcontroller = require('../../controller/playlist/playlist');

playlistrouter.post('/playlist/addPlaylist', auth, playlistcontroller.addPlaylist);
playlistrouter.delete('/playlist/removePlaylist/:paylistId',auth,playlistcontroller.removePlaylist)
playlistrouter.put('/playlist/updatePlaylist/:paylistId',auth,playlistcontroller.updatePlaylist)
playlistrouter.get('/playlist/getPlaylist/:adminId',auth,playlistcontroller.getadminPlaylist)
module.exports = playlistrouter;