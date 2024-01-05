const express = require('express');
const app = express();
const PORT = 3005
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectDb = require('./connection/connection');
connectDb();

const userrouter = require('./routes/user/user');
const videorouter = require('./routes/video/videoRoutes');
const categoryrouter = require('./routes/category/category');

app.use('/api',userrouter);
app.use('/api',videorouter);
app.use('/api',categoryrouter);

app.listen(PORT, ()=>{
    console.log(`Listining on port ${PORT}`);
})