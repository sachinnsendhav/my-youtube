const SubscriptionPlan = require('../../model/subscriptionplan/subscriptionplan');

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