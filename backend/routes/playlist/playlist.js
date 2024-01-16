const express = require('express');
const auth = require('../../middleware/auth');
const playlistrouter = express.Router();
const playlistcontroller = require('../../controller/playlist/playlist');

playlistrouter.post('/playlist/addPlaylist', auth, playlistcontroller.addPlaylist);
playlistrouter.delete('/playlist/removePlaylist/:paylistId',auth,playlistcontroller.removePlaylist)
playlistrouter.put('/playlist/updatePlaylist/:paylistId',auth,playlistcontroller.updatePlaylist)
playlistrouter.get('/playlist/getPlaylist',auth,playlistcontroller.getadminPlaylist)
playlistrouter.post('/playlist/allotPlayList/:id', auth, playlistcontroller.allotPlayList);
playlistrouter.put('/playlist/deleteUserTypePlaylist/:userTypeId/userTypePlayList/:userTypePlayListId', auth, playlistcontroller.deleteUserTypePlayList);
playlistrouter.get('/playlist/getUserPlaylist/:userId',playlistcontroller.getUserPlaylist)
playlistrouter.post('/moveup/:playlistId/:sNo',auth,playlistcontroller.moveUpVideo)
playlistrouter.post('/movedown/:playlistId/:sNo',auth,playlistcontroller.moveDownVideo)

module.exports = playlistrouter;