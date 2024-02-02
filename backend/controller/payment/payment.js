// const User = require('../../model/userModel');
const Razorpay = require("razorpay");
const axios = require('axios');

exports.createOrder = async (req,res) => {
    try{
        const instance = new Razorpay({
            key_id: 'rzp_test_5FcvK0MsUDGkTa',
            key_secret: 'ABFPqRHaOMVGD7KHbsKqDu2M',
        });

        const { amount, currency, reciept } = req.body;
        var options = { amount : amount*100, currency : currency, receipt: reciept };
        const orders = await instance.orders.create(options);

        if(!orders){
            return res.status(500).send("Internal Server Error");
        }
        res.status(200).send({ data : orders });
    }
    catch(error){
        return res.status(400).send({data:"Not found"});
    }
}

exports.placeOrder = async (req,res) => {
    try{
        console.log("on place order")
        const instance = new Razorpay({
            key_id: 'rzp_test_5FcvK0MsUDGkTa',
            key_secret: 'ABFPqRHaOMVGD7KHbsKqDu2M',
        });

        // const data = req.body.userData;
        // const amount_data = Number(req.body.amount).toFixed(0)*0.75;
        const { paymentId } = req.body;
        console.group("payment id is", paymentId);
        const order = await instance.payments.fetch(paymentId);

        if(!order){
            return res.status(500).send("Internal Server Error");
        }

        // const user = await User.findById({_id:data.userId});
        // user.coins = Number(user.coins + amount_data).toFixed(0);
        // await user.save();
        // console.log("usersssssssss",user);

        return res.status(200).send( { data : order } );
    }
    catch(error){
        console.log("error is",error);
        return error;
    }
}

exports.payments = async (req,res) => {
    try{
        let config = {
        maxBodyLength: Infinity,
        headers: {
            'Authorization': 'Basic cnpwX3Rlc3RfNUZjdkswTXNVREdrVGE6QUJGUHFSSGFPTVZHRDdLSGJzS3FEdTJN',
            'Access-Control-Allow-Origin': '*'
        }
        };

        axios.get('http://api.razorpay.com/v1/payments', config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            var transformend_data = [];
            Promise.all(
                response?.data?.items?.map((item)=>{
                    transformend_data.push({
                        amount:Number(item?.amount/100),
                        currency:item?.currency,
                        email:item?.email,
                        contact:item?.contact
                    })
                })
            )
            res.status(200).send( { count:response?.data?.count, data:transformend_data} );
        })
        .catch((error) => {
            res.status(401).send( { message:error } )
        });
    }
    catch(error){
        console.log("erroris",error);
        res.status(401).send( { "message":error } );
    }
}