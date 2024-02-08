const UserType = require('../../model/user/userTypeModel');
const User = require('../../model/user/userModel');

async function subscriptionplanhelper(userId){
    const userTypeData = await UserType.find({userId:userId});
    const userData = await User.findById({_id:userId});
    // if(userData.)
    // console.log("admindata is", userData);
    const userTypeLength = userTypeData.length;
    data = {userTypeLength:userTypeLength,planType:userData.subscriptionType.planType};
    console.log("******",userTypeLength);
    return data;
}

module.exports = subscriptionplanhelper;