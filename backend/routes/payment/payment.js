const express = require('express');
const auth = require('../../middleware/auth');
const paymentrouter = express.Router();
const paymentcontroller = require('../../controller/payment/payment');

paymentrouter.post('/payment/createOrder',auth , paymentcontroller.createOrder);
paymentrouter.post('/payment/placeOrder',auth , paymentcontroller.placeOrder);
paymentrouter.get('/getPayments', auth, paymentcontroller.payments);

module.exports = paymentrouter;