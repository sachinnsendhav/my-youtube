const User = require('../../model/user/userModel');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
function issueJwt(paylod){
    const token=jwt.sign({paylod},`my-youtube`,{expiresIn:'1h'})
    return token
}

exports.signup = async(req,res) => {
    try{
        const { firstName, lastName, email, phoneNumber, userPassword, userRole } = req.body;
        let userExist = await User.findOne({email})
        if (userExist) {
            return res.status(400).send( { status:400, message:"User already exists" } );
        }
        const role = userRole || 'user';
        const password=await bcrypt.hash(userPassword,10);
        const payload = { firstName, lastName, email, phoneNumber,password, role };
        const user = new User(payload);
        await user.save();
        const token=issueJwt(payload)
        return res.status(200).send( { status:200, message:"User registered successfully",token } );
    }
    catch(error){
        return res.status(400).send( { status:400, message:error.message } );
    }
}

exports.login= async(req,res)=>{
    try{
        const { email, password,role } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status:"401",message: 'Authentication failed' });
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ status:"401",message: 'Invalid Password Authentication failed' });
          }
          const token=issueJwt(user)
          return res.status(200).json( { status:200, message:"Login successful",token,user } );
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}