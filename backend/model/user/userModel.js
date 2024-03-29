const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate:{
            validator: (value) => {
                return validator.isAlpha(value.replace(/\s/g,''),'en-US', { ignore: ' ' });
            },
            message: 'First name must contain only letters',
        }
    },
    lastName: {
        type: String,
        validate: {
            validator: (value) => {
                return validator.isAlpha(value.replace(/\s/g, ''), 'en-US', { ignore: ' ' });
            },
            message: 'Last name must contain only letters',
        },
    },
    email: {
        type: String,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: 'Invalid email address',
        },
        unique: true
    },
    phoneNumber: {
        type: Number,
        validate: {
            validator: (value) => {
                return validator.isNumeric(String(value)) && String(value).length === 10;
            },
            message: 'Invalid phone number',
        },
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin']
    },
    token:{
        type:String,
        default:''
    },
    createdAt:{
        type : Date,
        default : Date.now,
        required : true
    },
    subscription:{
        type : Date,
    },
    expirationDate:{
        type: Date,
    },
    subscriptionType:{
        subscriptionId : {
            type : mongoose.Schema.Types.ObjectId
        },
        planType : {
            type : String
        }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;