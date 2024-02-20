const channel=require("../../model/channel/channel")
const userType=require("../../model/user/userTypeModel")
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
        const channelExist=await channel.findOne({$and:[{channelName},{userId}]})
        console.log("www",!channelExist)
        if(channelExist){
          return res.status(400).send({
            status: "FAILED",
            mesage: `Channel with this ${channelId} already exist`,
          })
        }
        const addChannel=new channel({channelName,channelId,userId})
        addChannel.save()
        res.status(201).send({status:"200",statusText:"OK",data:addChannel})
      } catch (error) {
        console.log("err", error);
        return res.status(400).send({ status: 400, message: error.message });
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
            userData.save()
            res.status(201)
        .send({
          status: 201,
          message: "Channel added successfully",
          data: userData,
        });
      }catch(error){
        return res.status(400).send({ status: 400, message: error.message });
      }
    },

    getuserTypeChannel: async (req, res, next) => {
      try {
        const userTypeId = req.user.paylod._id;
        const channels = await userType.findById({ _id: userTypeId });
        res.status(200).send({ status: 200, message: "Success", data: channels.channel });
      } catch (error) {
        console.log("err", error);
        return res.status(400).send({ status: 400, message: error.message });
      }
    }

    // deleteVideo: async (req, res) => {
    //   try {
    //     const videoId = req.params.videoId;
    //     const paylistId = req.query.paylistId;
    //     const role = req.user.paylod.role;
    //     if (role == "user") {
    //       return res.status(401).send({ status: 401, message: "Not Authorized" });
    //     }
    //     const playlistExist = await playlist.findById({ _id: paylistId });
    //     if (!playlistExist) {
    //       return res
    //         .status(404)
    //         .send({ status: 404, message: "Playlist not found" });
    //     }
    //     const playlistVideoExist = await playlist.updateOne(
    //       { _id: paylistId },
    //       { $pull: { video: { _id: videoId } } }
    //     );
    //     if (playlistVideoExist.modifiedCount === 0) {
    //       return res
    //         .status(404)
    //         .send({ status: 404, message: "Video not found in playlist" });
    //     }
    //     await playlist.updateOne(
    //       { _id: paylistId },
    //       { $inc: { "video.$[].sNo": -1 } }
    //     );
    //     res
    //       .status(204)
    //       .send({ status: 204, message: "Video Deleted Sucessfully", data: "" });
    //   } catch (error) {
    //     res.status(400).send({ status: 400, message: error.message, data: "" });
    //   }
    // }
  };