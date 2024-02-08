const mongoose = require('mongoose');

const subscriptionplan = new mongoose.Schema({
    planType:{
        type : String,
        required : true,
        enum: ['individual','family']
    },
    description:{
        type : String,
        required : true
    },
    subscriptionPrice:{
        type : Number,
        enum : [29,99]
    }
})

const SubscriptionPlan = mongoose.model('subscriptionplan',subscriptionplan);
module.exports = SubscriptionPlan;