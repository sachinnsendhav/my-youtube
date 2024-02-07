const User = require('../../model/user/userModel');
const UserType = require('../../model/user/userTypeModel');
const playlist=require('../../model/playlist/playlist')
const otpSchema=require('../../model/otp/otp')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const otpGenerator=require('otp-generator')
const nodemailer = require('nodemailer');
const sendMail=require('../../middleware/sendmail')
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const hbs = require("hbs");
const path = require("path");
const fs = require('fs');
const { randomUUID } = require('crypto');
const template_path = path.join(__dirname, "../../templates/views"); //for templates files(hbs)
const source = fs.readFileSync(path.join(template_path, 'otp.hbs'), 'utf8');
const template = hbs.compile(source);
app.set('view engine', 'hbs')
app.set('views', template_path)  //for templates files (hbs)

function issueJwt(paylod){
    const token=jwt.sign({paylod},`my-youtube`,{expiresIn:'15d'})
    return token
}

function issueJwtForUserType(paylod){
    const token=jwt.sign({paylod},`my-youtube`)
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
        console.log("userdata",userData)
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

exports.updatePassword=async(req,res)=>{
    const userId=req.user.paylod._id
    const{oldPassword,updatePassword}=req.body
    const data=await User.findOne({_id:userId})
    if(!data){
        return res.status(404).json({"status":404,message:"User not found",data:""})
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, data.password);
    if (!isPasswordValid) {
        return res.status(401).json({ status:"401",message: 'Invalid Old Password Authentication failed' });
    }
    const newPassword=await bcrypt.hash(updatePassword,10);
    const userData=await User.findByIdAndUpdate({_id:userId},{$set:{password:newPassword}})
    res.status(201).json({status:201,message:"Password Updated SuccessFully",data:''})
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
            const randomuuid=randomUUID()
            const data=await User.updateOne({email:email},{$set:{token:randomuuid}})
            await sendMail(userExist,randomuuid)
            
            return res.status(201).send( { status:201, message:"Reset Password Link Has Been Send To Your Email", data:'' } );
        }
    }catch(error){
        console.log("forgeterror",error)
        return res.status(500).send({ status: 500, message: "Internal Server Error", data: '' });
    }
}

exports.forgetPasswordSave=async(req,res)=>{
    try{
        const {email,password}=req.body
        const token=req.query.token
        const uuidExist=await User.findOne({token:token})
        if(!uuidExist){
            res.status(401).send({status:401,message:"Password Reset token already use"})
        }
        const userPassword=await bcrypt.hash(password,10);
        const userpasswordUpdate = await User.findByIdAndUpdate({_id:uuidExist._id},{password:userPassword,token:""},{new:true});
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
        const { firstName, lastName, email, phoneNumber } = req.body;

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
        const { firstName,lastName,userName,password,gender } = req.body;
        const userId = req.user.paylod._id;
        const role = 'user';
        const usertype = new UserType( { firstName,lastName,userName,password,userId,role,gender } );
        await usertype.save();
        return res.status(200).send( { status:200,message:"User Added Successfully", data:{firstName,lastName,userName,gender} } )
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

exports.getcustomerList=async(req,res)=>{
    try{
        const role=req.user.paylod.role
        if(role!="superadmin"){
            return res.status(401).send({status:401,message:"Not authorized"})
        }
        let adminData=await User.find({role:"admin"})
        const data=adminData.map((item)=>({
            "adminId": item._id,
            "firstName": item.firstName,
            "lastName": item.lastName,
            "email": item.email,
            "phoneNumber": item.phoneNumber,
            "role": item.role,
        }))
        res.status(200).json({status:200,message:"",data:data})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

exports.getcustomersDetails=async(req,res)=>{
    try{
        const role=req.user.paylod.role
        const customerId=req.params.customerId
        if(role!="superadmin"){
            return res.status(401).send({status:401,message:"Not authorized"})
        }
        let adminData=await User.findById({_id:customerId})
        if (!adminData) {
            return res.status(404).send({status:404,message:"Customer not found"})
        }
        const adminModifyData={
            "adminId": adminData._id,
            "firstName": adminData.firstName,
            "lastName": adminData.lastName,
            "email": adminData.email,
            "phoneNumber": adminData.phoneNumber,
            "role": adminData.role,
        }
        const userByAdminId=await UserType.find({userId:customerId})
        const playlistByAdminId=await playlist.find({userId:customerId})
        res.status(200).json({status:200,message:"",data:{parentData:adminModifyData,userData:userByAdminId,playlistData:playlistByAdminId}})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

exports.userTypeDetailuserTypeId=async(req,res)=>{
    try{
        const userTypeId=req.params.userTypeId
        const parentId=req.user.paylod._id
        let user= await UserType.findOne({ $and: [{ _id:userTypeId }, { userId:parentId }] })
        if(!user){
            return res.sendStatus(404).send({status:404,message:"User not found"})
        }
        res.status(200).json({status:200,message:"",data:user})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

exports.userTypeLogin = async(req,res) => {
    try{
        const { userName, password } = req.body;
        const user = await UserType.find({ userName });
        const user_data = user[0]
        if(!user_data){
            return res.status(404).send({status:404,message:'User Not Found',data:''});
        }
        const adminData=await User.findById({_id:user_data.userId})
        if(user_data.userName === userName && user_data.password === password){
            const token = issueJwtForUserType(user_data);        
            res.status(200).send({status:200,message:'Success',data:{ token:token, userData:{...user_data.toObject(),parentfirstName:adminData?.firstName,parentLastName:adminData?.lastName,parentPhoneNumber:adminData?.phoneNumber} }});
        }
        else{
            res.status(404).send({status:404,message:'Invalid Credentials',data:''});
        }
    }
    catch(error){
        res.status(400).send({status:400,message:error.message,data:''});
    }
}

exports.updateUserTypeDetails = async(req,res) => {
    try{
        const userTypeId = req.params.userTypeId;
        const { firstName, lastName, password, gender, avatar } = req.body
        // Create an object with the fields that need to be updated
        const exist_user = await UserType.findById({_id:userTypeId});
        console.log("exist",exist_user);
        if(!exist_user){
            return res.status(404).send({status:404, message:'User not found', data:""});
        }
        const updateFields = {
            ...(firstName ? { firstName } : {}),  // Include firstName if it exists
            ...(lastName ? { lastName } : {}),
            ...(password ? { password } : {}),
            ...(gender ? { gender } : {}),
            ...(avatar ? { avatar } : {}),
        };
        const userTypeData = await UserType.findByIdAndUpdate({_id:userTypeId},{ $set: updateFields }, { new: true });
        console.log("usertypedata",userTypeData);
        console.log("userTypeIdIs", userTypeId);
        res.status(200).send({status:200, message:"Data updated successfully", data:userTypeData})
    }
    catch(error){
        console.log("error is",error);
        return res.status(404).send({status:404,message:error,data:""})
    }
}

exports.getUserType = async (req,res) => {
    try{
        const userTypeId = req.params.userTypeId;
        const data = await UserType.findById( { _id:userTypeId } );
        if (!data) {
            return res.status(404).send({status:404,message:'User not found',data:""})
        }
        return res.status(200).send({status:200,message:'Success',data:data});
    }
    catch(error){
        console.log("error is", error);
        res.status(400).send({status:400,message:error,data:""})
    }
}