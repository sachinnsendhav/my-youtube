const User = require('../../model/user/userModel');

exports.signup = async(req,res) => {
    try{
        const { firstName, lastName, email, phoneNumber, password, userRole } = req.body;
        const role = userRole || 'user';
        const payload = { firstName, lastName, email, phoneNumber, password, role };
        const user = new User(payload);
        await user.save();
        res.status(200).send( { status:200, message:"User registered successfully" } );
    }
    catch(error){
        return res.status(400).send( { status:400, message:error.message } );
    }
}