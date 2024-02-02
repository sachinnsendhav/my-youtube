const express = require('express');
const auth = require('../../middleware/auth');
const paymentrouter = express.Router();
const paymentcontroller = require('../../controller/payment/payment');

paymentrouter.post('/payment/createOrder', paymentcontroller.createOrder);
paymentrouter.post('/payment/placeOrder', paymentcontroller.placeOrder);
paymentrouter.get('/getPayments', auth, paymentcontroller.payments);

module.exports = paymentrouter;