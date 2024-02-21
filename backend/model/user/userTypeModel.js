const mongoose = require('mongoose');
const validator = require('validator');

const usertypemodel = new mongoose.Schema({
    firstName:{
        type : String,
        validate:{
            validator: function(value){
                return validator.isUppercase(value);
            },
            message: 'Firstname should start with uppercase letter'
        },
        validate:{
            validator: function(value){
                return !validator.matches(value, /[!@#$%^&*(),.?":{}|<>]/)
            },
            message: 'First name cannot contain special characters'
        },
        required: true
    },
    lastName:{
        type : String,
        validate:{
            validator: function(value){
                return validator.isUppercase(value);
            },
            message: 'Lastname should start with uppercase letter'
        },
        validate:{
            validator: function(value){
                return !validator.matches(value, /[!@#$%^&*(),.?":{}|<>]/)
            },
            message: 'Lastname cannot contain special characters'
        },
        required: true
    },
    userName:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    playList:{
        type : Array,
        default : []
    },
    channel:[{
        channelName:{
            type:"String"
        },
        channelId:{
            type:"String"
        }
    }],
    role:{
        type : String,
        required : true,
        enum: ['user']
    },
    gender:{
        type : String,
        enum: ['male', 'female'],
        required : true
    },
    avatar:{
        type : String,
        default : ""
    }
});

const UserType = mongoose.model('UserType', usertypemodel);
module.exports = UserType;