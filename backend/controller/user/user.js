const User = require('../../model/user/userModel');
const UserType = require('../../model/user/userTypeModel');
const otpSchema=require('../../model/otp/otp')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const otpGenerator=require('otp-generator')
const nodemailer = require('nodemailer');
const sendMail=require('../../middleware/sendmail')
const express = require('express');
const app = express();
const hbs = require("hbs");
const path = require("path");
const fs = require('fs');
const template_path = path.join(__dirname, "../../templates/views"); //for templates files(hbs)
const source = fs.readFileSync(path.join(template_path, 'otp.hbs'), 'utf8');
const template = hbs.compile(source);
app.set('view engine', 'hbs')
app.set('views', template_path)  //for templates files (hbs)

function issueJwt(paylod){
    const token=jwt.sign({paylod},`my-youtube`,{expiresIn:'1h'})
    return token
}

exports.signup = async(req,res) => {
    try{
        const { firstName, lastName, email, phoneNumber, userPassword, otp } = req.body;
        let userExist = await User.findOne({email})
        if (userExist) {
            return res.status(400).send( { status:400, message:"User already exists", data:'' } );
        }
        const checkOtp = await otpSchema.find({email});
        if(checkOtp.length==0?[]:checkOtp[0].otp !== otp){
            return res.status(401).send({status:"Failure",message:"Invalid Otp",data:''})
        }
        const role = 'admin';
        const password=await bcrypt.hash(userPassword,10);
        const payload = { firstName, lastName, email, phoneNumber,password, role };
        const user = new User(payload);
        const userData=await user.save();
        const token=issueJwt(userData)
        const user_data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: role
        }
        return res.status(200).send( { status:200, message:"User registered successfully",data:{token:token,userData:user_data} } );
    }
    catch(error){
        return res.status(400).send( { status:400, message:error.message } );
    }
}

exports.verify=async(req,res)=>{
    try{
        const {email}=req.body
        const existingOtp = await otpSchema.find({email});
        if(existingOtp.length>0){
            return res.status(429).send({status:429,message:"OTP already shared to your email",data:''})
        }
        const otp=otpGenerator.generate(4,{upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false,digits:true})
        const paylod={email,otp}
        const otpData = await new otpSchema(paylod);
        console.log("otpdata",otpData);
        await otpData.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.HOST_NODEMAILER,
            port: process.env.PORT_NODEMAILER,
            secure: true,
            auth: {
              user: process.env.FORM_EMAIL_NODEMAILER,
              pass: process.env.FORM_PASS_NODEMAILER,
            },
        });

        // Sending the mail to users:
        const mailOptions = {
            from : process.env.FORM_EMAIL_NODEMAILER,
            to : email,
            subject : 'Your OTP for registration',
            html : template({ otp }),
            context : { otp },
            text : `Yout OTP is ${otp}`
        };
        const sendingMail = await transporter.sendMail(mailOptions);

        return res.status(201).send({status:'success',message:"Otp genrate successfully",data:''})
    }
    catch(error){
        console.log("errore us",error)
        res.status(400).send('OTP already send to your Email Address');
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

exports.forgetPassword=async(req,res)=>{
    try{
        const {email}=req.body
        let userExist = await User.findOne({email})
        console.log("userExist", userExist);
        if (!userExist) {
            return res.status(400).send( { status:400, message:"User does not exists", data:'' } );
        }
        else{
            await sendMail(userExist)
            return res.status(201).send( { status:201, message:"Reset Password Link Has Been Send To Your Email", data:'' } );
        }
    }catch(error){
        console.log("forgeterror",error)
        return res.status(500).send({ status: 500, message: "Internal Server Error", data: '' });
    }
}

exports.forgetPasswordSave=async(req,res)=>{
    try{
        const userId=req.user.paylod._id
        const {email,password}=req.body
        const userPassword=await bcrypt.hash(password,10);
        const userpasswordUpdate = await User.findByIdAndUpdate({_id:userId},{password:userPassword},{new:true});
        if (!userpasswordUpdate) {
            return res.status(404).json({ status:"404",message: 'User Not Found' });
          }
        return res.status(201).json({status:"Success",message:"Password Update Successfully",data:userpasswordUpdate})  
    }catch(error){
        console.log("forgeterror",error)
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