const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model('Category',categorySchema);
module.exports = Category;