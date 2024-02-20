const express = require('express');
const auth = require('../../middleware/auth');
const playlistrouter = express.Router();
const playlistcontroller = require('../../controller/playlist/playlist');
const subscription = require('../../middleware/subscription');

playlistrouter.post('/playlist/addPlaylist', auth, subscription, playlistcontroller.addPlaylist);
playlistrouter.delete('/playlist/removePlaylist/:paylistId',auth, subscription, playlistcontroller.removePlaylist)
playlistrouter.put('/playlist/updatePlaylist/:paylistId',auth, subscription, playlistcontroller.updatePlaylist)
playlistrouter.get('/playlist/getPlaylist',auth,playlistcontroller.getadminPlaylist)
playlistrouter.post('/playlist/allotPlayList/:id', auth, subscription, playlistcontroller.allotPlayList);
playlistrouter.put('/playlist/deleteUserTypePlaylist/:userTypeId/userTypePlayList/:userTypePlayListId', auth, subscription, playlistcontroller.deleteUserTypePlayList);
playlistrouter.get('/playlist/getUserPlaylist/:userId',playlistcontroller.getUserPlaylist)
playlistrouter.post('/moveup/:playlistId/:sNo',auth,playlistcontroller.moveUpVideo)
playlistrouter.post('/movedown/:playlistId/:sNo',auth,playlistcontroller.moveDownVideo)

module.exports = playlistrouter;