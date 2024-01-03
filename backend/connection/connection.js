const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/MyYoutube';

const connectDb = async () => {
    try{
        await mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true,});
        console.log('Connected to the database');
    }
    catch(error){
        console.error('Error connecting to the database:', error);
    }
}

module.exports = connectDb;


