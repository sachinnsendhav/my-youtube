const User = require('../../model/user/userModel');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');
function issueJwt(paylod){
    const token=jwt.sign({paylod},`my-youtube`,{expiresIn:'1h'})
    return token
}

exports.signup = async(req,res) => {
    try{
        const { firstName, lastName, email, phoneNumber, userPassword, userRole } = req.body;
        let userExist=await User.findeOne({email})
        if (userExist) {
         res.status(400).send( { status:400, message:"User already exists" } );
        }
        const role = userRole || 'user';
        const password=bcrypt.hash( userPassword,10)
        const payload = { firstName, lastName, email, phoneNumber,password, role };
        const user = new User(payload);
        await user.save();
        const token=issueJwt(payload)
        res.status(200).send( { status:200, message:"User registered successfully",token } );
    }
    catch(error){
        return res.status(400).send( { status:400, message:error.message } );
    }
}