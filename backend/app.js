const express = require('express');
const app = express();
const PORT = 3005
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectDb = require('./connection/connection');
connectDb();

const userrouter = require('./routes/user/user');

app.use('/api',userrouter);

app.listen(PORT, ()=>{
    console.log(`Listining on port ${PORT}`);
})