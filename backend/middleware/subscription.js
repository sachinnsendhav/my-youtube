const User = require('../model/user/userModel');

const subscription = async (req, res, next) => {

    const user_data = await User.findById({_id:req.user.paylod._id});
    console.log("userdatais", user_data);

    // Get the current date
    const currentDate = new Date();
    console.log("current date is", currentDate.toISOString());

    // const checkingDate = new Date('2023-03-07T09:17:48.565+00:00')

    if(user_data.subscription){
         // Check if the current date is greater than or equal to the subscription date
         if (currentDate < user_data.subscription) {
            return res.status(403).json({ message: 'Invalid subscription date' });
        }

        // Check if the current date is less than or equal to the expiration date
        if (currentDate > user_data.expirationDate) {
            return res.status(403).json({ message: 'Subscription expired. Please renew your subscription.' });
        }
        next();
    }
    else{
        // Parse the subscription date from the user's payload
        const createdDate = new Date(user_data.createdAt);

        // Ensure both dates are in UTC timezone
        const currentDateUTC = new Date(currentDate.toISOString());
        const subscriptionDateUTC = new Date(createdDate.toISOString());

        // Calculate the difference in milliseconds
        const differenceInMs = Math.abs(subscriptionDateUTC.getTime() - currentDateUTC.getTime());

        // Calculate the difference in days and round it to the nearest whole number
        const differenceInDays = (differenceInMs / (1000 * 60 * 60 * 24)).toFixed(0);
        console.log("date difference is", differenceInDays);

        if(differenceInDays < 4) {
            next()
        }
        else{
            return res.status(400).send({status:400, message:"Your Free Trial Subscription Is Over", data:""});
        }
    }
}

module.exports = subscription;
