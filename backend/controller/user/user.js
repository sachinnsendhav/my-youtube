const User = require('../../model/user/userModel');
const UserType = require('../../model/user/userTypeModel');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');

function issueJwt(paylod){
    const token=jwt.sign({paylod},`my-youtube`,{expiresIn:'1h'})
    return token
}

exports.signup = async(req,res) => {
    try{
        const { firstName, lastName, email, phoneNumber, userPassword } = req.body;
        let userExist = await User.findOne({email})
        if (userExist) {
            return res.status(400).send( { status:400, message:"User already exists", data:'' } );
        }
        const role = 'admin';
        const password=await bcrypt.hash(userPassword,10);
        const payload = { firstName, lastName, email, phoneNumber,password, role };
        const user = new User(payload);
        const userData=await user.save();
        const token=issueJwt(userData)
        return res.status(200).send( { status:200, message:"User registered successfully",data:{token:token} } );
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
          console.log("user1234",user)
          const token=issueJwt(user)
          const userData = { firstName:user.firstName, lastName:user.lastName, email:user.email, phoneNumber:user.phoneNumber, role:user.role }
          return res.status(200).json( { status:200, message:"Login successful",data:{token:token,userData:userData} } );
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.updateUserDetail=async(req,res)=>{
    try{
        const { firstName, lastName, email, phoneNumber} = req.body;
        let userExist = await User.findById(req.params.userId)
        if (!userExist) {
            return res.status(404).send( { status:404, message:"User not available", data:'' } );
        }
        userExist.firstName=firstName||userExist.firstName
        userExist.lastName=lastName|| userExist.lastName
        userExist.email=email||userExist.email
        userExist.phoneNumber=phoneNumber|| userExist.phoneNumber
        await userExist.save()
        res.json({status:201,message:"User Update Successfully",data:userExist})    
    }catch(error){
        console.error(error)
        return res.status(400).send( { status:400, message:error.message } );
    }
}

exports.addUsers = async(req,res) => {
    try{
        const { firstName,lastName,userName,password } = req.body;
        const userId = req.user.paylod._id;
        const role = 'user';
        const usertype = new UserType( { firstName,lastName,userName,password,userId,role } );
        await usertype.save();
        return res.status(200).send( { status:200,message:"User Added Successfully", data:{firstName,lastName,userName} } )
    }
    catch(error){
        console.log("useres are",error);
        return res.status(400).send( { status:400, message:error.message } );
    }
}

exports.deleteUser = async(req,res) => {
    try{
        const id = req.params.id;
        const delete_user = await UserType.findByIdAndDelete( {_id:id} );
        if(delete_user){
            res.status(204).send({ status:204,message:"User deleted successfully",data:"" });
        }
        else{
            res.status(404).send({ status:404, message:`User id ${id} is not valid`, data:"" })
        }
    }
    catch(error){
        res.status(400).send({ message:error.message });
    }
}

// exports.getAllUser=async(req,res)=>{
//     try{
//         let user= await User.find()
//         res.status(200).json(user)
//     }catch(error){
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// }

exports.getAllUserByparentId=async(req,res)=>{
    try{
        let user= await UserType.find({userId:req.user.paylod._id})
        res.status(200).json({status:200,message:"",data:user})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
}