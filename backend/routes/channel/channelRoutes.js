const express = require('express');
const channelrouter = express.Router();
const channelController = require('../../controller/channel/channel');
const auth = require('../../middleware/auth');
const subscription = require('../../middleware/subscription');
channelrouter.post('/channel/addChannel',auth, subscription, channelController.addChannel);
channelrouter.get('/channel/getChannels',auth,channelController.getChannel);
channelrouter.get('/channel/getChannels/:userTypeId',auth,channelController.getuserTypeChannel);
channelrouter.post('/channel/allotChannel/:userTypeId',auth,channelController.allotChannel)
channelrouter.patch('/channel/removeallotedChannel/:userTypeId/:channelId',auth,channelController.removeAllotedChannel)
channelrouter.delete('/channel/deleteChannel/:channelId',auth,channelController.deleteChannel)
module.exports = channelrouter;