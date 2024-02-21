const SubscriptionPlan = require('../../model/subscriptionplan/subscriptionplan');
const User = require('../../model/user/userModel');

exports.createPlan = async (req,res) =>{
    try{
        const { planType, description, subscriptionPrice } = req.body;
        const subscriptionplan = new SubscriptionPlan({planType:planType, description:description, subscriptionPrice:subscriptionPrice});
        const subcriptionplanData = await subscriptionplan.save();
        res.status(200).send({status:200,message:"Success",data:subcriptionplanData});
    }
    catch(error){
        res.status(404).send({status:404,message:error,data:""});
    }
}

exports.getPlans = async (req,res) => {
    try{
        const subcriptionplanData = await SubscriptionPlan.find();
        res.status(200).send({status:200,message:"Success",data:subcriptionplanData});
    }
    catch(error){
        res.status(404).send({status:404,message:error,data:""});
    }
}

exports.getUSerPlan = async (req,res) => {
    try{
        const userId = req.user.paylod._id;
        const user_data = await User.findById({_id:userId});
        const transform_data = {
            createdAt : user_data.createdAt,
            subscriptionType : user_data?.subscriptionType ? user_data?.subscriptionType?.planType : 'Not subscribed to any plan',
            subscriptionDate : user_data?.subscription ? user_data?.subscription : '',
            expirationDate : user_data?.expirationDate ? user_data?.expirationDate : '',
        }
        if(!user_data) return res.status(404).send({status:404, message:'User Not Found', data:''});

        return res.status(200).send({status:200, message:'Success', data:transform_data});
    }
    catch(error){
        return res.status(400).send({status:400, message:error, data:""});
    }
}