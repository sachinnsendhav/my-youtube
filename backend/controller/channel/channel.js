const channel=require("../../model/channel/channel")
const userType=require("../../model/user/userTypeModel")
const mongoose = require('mongoose')
const errorHandlerMiddleware = require("../../middleware/errorvalidation")

module.exports = {
    addChannel: async (req, res) => {
      console.log(req.user.paylod, "auth req user");
      try {
        const role = req.user.paylod.role;
        
        if (role == "user") {
          return res.status(401).send({ status: 401, message: "Not Authorized" });
        }
        const userId=req.user.paylod._id
        const { channelName, channelId} = req.body;
        const channelExist=await channel.findOne({$and:[{channelId},{userId}]})
        console.log("www",channelExist)
        if(channelExist){
          return res.status(400).send({
            status: "FAILED",
            mesage: `Channel with this ${channelId} already exist`,
          })
        }
        const addChannel=new channel({channelName,channelId,userId})
        await addChannel.save()
        res.status(201).send({status:"200",statusText:"OK",data:addChannel})
      } catch (error) {
        console.log("err", error);
        // return res.status(400).send({ status: 400, message: error.message });
        errorHandlerMiddleware(error,req,res)
      }
    },
    getChannel: async (req, res, next) => {
      try {
        const userId = req.user.paylod._id;
        const channels = await channel.find({ userId: userId });
        res.status(200).send({ status: 200, message: "Success", data: channels });
      } catch (error) {
        console.log("err", error);
        return res.status(400).send({ status: 400, message: error.message });
      }
    },

    allotChannel: async(req,res,next)=>{
      try{
          const userTypeId=req.params.userTypeId
          const {channelName,channelId}=req.body
          const userData = await userType.findById({_id:userTypeId});
            if (!userData) {
                return res.status(404).send({ status:404,message: "User not found",data:'' });
            }
            console.log("userData",userData)
            const channelExist=userData.channel.findIndex(channel => channel.channelId === channelId)
            console.log("chann",channelExist)
            if(channelExist!=-1){
              return res.status(404).send({ status:404,message: "Channel already exist",data:'' });
            }
            userData.channel.push({
              channelName:channelName,
              channelId:channelId
            })
            await userData.save()
            res.status(201)
        .send({
          status: 201,
          message: "Channel added successfully",
          data: userData,
        });
      }catch(error){
        // return res.status(400).send({ status: 400, message: error.message });
        errorHandlerMiddleware(error,req,res)
      }
    },

    getuserTypeChannel: async (req, res, next) => {
      try {
        const userTypeId = req.user.paylod._id;
        const channels = await userType.findById({ _id: userTypeId });
        res.status(200).send({ status: 200, message: "Success", data: channels.channel });
      } catch (error) {
        console.log("err", error);
        // return res.status(400).send({ status: 400, message: error.message });
        errorHandlerMiddleware(error,req,res)
      }
    },

    removeAllotedChannel:async(req,res,next)=>{
      try{
        const userTypeId=req.params.userTypeId
      const channelId=req.params.channelId
      const userTypeExist=await userType.findById({_id:userTypeId})
      if(!userTypeExist){
        return res.status(404).send({
          status: "FAILED",
          mesage: `UserType Not found`,
        })
      }
      if(userTypeExist.channel.findIndex(channel => channel.channelId === channelId)==-1){
        return res.status(404).send({
          status: "FAILED",
          mesage: `ChannelId Not found`,
        })
      }
      const filteredChannels = userTypeExist.channel.filter(item => item.channelId !== channelId);
      console.log("")
      userTypeExist.channel = filteredChannels;
      const updatedData=await userType.findByIdAndUpdate(userTypeId, {
        $set: { channel: filteredChannels }
      },{new:true});
      res.status(200).send({
        status: "SUCCESS",
        message: "Channel removed successfully",
        data:updatedData
      });
      }catch(error){
        errorHandlerMiddleware(error,req,res)
      }
    },
    deleteChannel: async (req, res) => {
      try {
      const channelId=req.params.channelId
      console.log("ccc",channelId)
      const channelExist=await channel.findById({_id:channelId})
      if(!channelExist){
        return res.status(404).send({
          status: "FAILED",
          mesage: `ChannelId Not found`,
        })
      }  
      const deltedata= await channel.deleteOne({_id:channelId});
      console.log("dd",deltedata)
      await userType.find({userId:req.user.paylod._id})
      await userType.updateMany(
        {userId:new mongoose.Types.ObjectId(req.user.paylod._id)},
        {$pull:{channel:{channelId:channelExist.channelId}}}
    )
    res.status(204).send({ status:204,message:"Channel Delete Successfully", data:'' });
      } catch (error) {
        // res.status(400).send({ status: 400, message: error.message, data: "" });
        errorHandlerMiddleware(error,req,res)
      }
    }
  };