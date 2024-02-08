const User = require('../../model/user/userModel');
const SubscriptionPlan = require('../../model/subscriptionplan/subscriptionplan')
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
        const user_id = req.user.paylod._id;

        const instance = new Razorpay({
            key_id: 'rzp_test_5FcvK0MsUDGkTa',
            key_secret: 'ABFPqRHaOMVGD7KHbsKqDu2M',
        });

        // const data = req.body.userData;
        // const amount_data = Number(req.body.amount).toFixed(0)*0.75;
        const { paymentId, subscriptionId } = req.body;
        console.group("payment id is", paymentId, subscriptionId);

        const subscriptionData = await SubscriptionPlan.findById({_id:subscriptionId});

        const order = await instance.payments.fetch(paymentId);

        if(!order){
            return res.status(500).send("Internal Server Error");
        }

        const subscriptiondate = new Date();
        const expirationdate = new Date();
        const month = expirationdate.getMonth()+1;
        const updated_expiration_date = new Date(expirationdate.setMonth(month));

        const user_data = await User.findByIdAndUpdate({_id:user_id},{subscription:subscriptiondate, expirationDate:updated_expiration_date, subscriptionType:{ subscriptionId:subscriptionData._id, planType:subscriptionData.planType }});
        console.log("updated userData", user_data);

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