const express = require("express");
const subscriptionplancontroller = require('../../controller/subscriptionplan/subscriptionplan');
const subscriptionplanrouter = express.Router();
const auth = require('../../middleware/auth');

subscriptionplanrouter.post('/subscription/createPlan', subscriptionplancontroller.createPlan);
subscriptionplanrouter.get('/subscription/getPlans', auth, subscriptionplancontroller.getPlans);
subscriptionplanrouter.get('/subscription/getUserPlan', auth, subscriptionplancontroller.getUSerPlan)

module.exports = subscriptionplanrouter;