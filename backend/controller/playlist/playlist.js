const Category = require('../../model/playlist/playlist');
const UserType=require('../../model/user/userTypeModel')
const mongoose = require('mongoose')

exports.addPlaylist = async(req,res) => {
    try{
        const { name,description,role } = req.body;
        const userId = req.user.paylod._id;
        console.log("req123",req.user.paylod)
        const filterCategory=await Category.findOne({$and:[{name},{userId}]})
        console.log("filter",filterCategory)
        if (filterCategory) {
            return res.status(400).send({
                status: "FAILED",
                mesage: "Category with this name already exist",
              })
        }
        const category = new Category( {name,description,role,userId} );
        await category.save();
        const responseData = {
            id : category._id,
            name: category.name,
            description: category.description,
        };
        res.status(200).send({ status:200,message:"Playlist Added Successfully", data:responseData });
    }
    catch(error){
        return res.status(400).send({ status:400, message:error.message, data:'' });
    }
}

exports.removePlaylist = async(req,res) => {
    try{
        const paylistId = req.params.paylistId;
        const paylistExist=await Category.findById({_id:paylistId})
        if (!paylistExist) {
            return res.status(404).send({
                status: "404",
                mesage: "Paylist with this id not found",
              })
        }
        await Category.deleteOne({_id:paylistId});
        const findChildrenData = await UserType.find({userId:req.user.paylod._id})
        const updateUSerType = await UserType.updateMany(
            {userId:new mongoose.Types.ObjectId(req.user.paylod._id)},
            {$pull:{playList:{_id:new mongoose.Types.ObjectId(paylistId)}}}
        )
        res.status(204).send({ status:204,message:"Playlist Delete Successfully", data:'' });
    }
    catch(error){
        return res.status(400).send({ status:400, message:error.message, data:'' });
    }
}

exports.updatePlaylist= async(req,res)=>{
    try{
        const paylistId = req.params.paylistId;
        const userId = req.user.paylod._id;
        const { name,description } = req.body;
        const body={name:name,description:description}
        const paylistExist=await Category.findById({_id:paylistId})
        if (!paylistExist) {
            return res.status(404).send({
                status: "404",
                mesage: "Paylist with this id not found",
              })
        }
        const filterCategory=await Category.findOne({$and:[{name},{userId}]})
        console.log("filter",filterCategory)
        if (filterCategory) {
            return res.status(404).send({
                status: "404",
                mesage: "Playlist with this name already exist",
              })
        }
        const updateData=await Category.findByIdAndUpdate(paylistId,body,{ new: true })
        console.log("updateData",updateData)
        res.status(201).send({ status:201,message:"paylist updated successfully", data:updateData });
        
    }catch(error){
        console.log("err",error)
        res.status(500).json({ status:500, message: `Internal Server Error ${error}`, data:''});
    }
}

exports.getadminPlaylist=async(req,res)=>{
try{
    const adminId = req.user.paylod._id;
    let playlistData=await Category.find({userId:adminId})
    const updatedData=playlistData.map((item)=>({
            "_id": item?._id,
            "name": item?.name,
            "description": item?.description,
            "userId": item?.userId,
            "videoCount":item?.video.length
    }))
    res.status(200).json({status:200,message:"",data:updatedData})
}catch(error){
    console.error(err.message);
    res.status(500).send("Server error");
}
}

exports.getUserPlaylist=async(req,res)=>{
    try{
        const userId=req.params.userId
        let playlistData=await UserType.findById({_id: new mongoose.Types.ObjectId(userId)})

        if(!playlistData){
         res.status(404).json({status:404,message:"User not found",data:""})
        }
        console.log("playlistDtaa",playlistData);
        res.status(200).json({status:200,message:"",data: playlistData.playList})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
    }

exports.allotPlayList = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            console.log("idus", id);
            const playlistIdFromBody = req.body.playlistId;

            // Fetch user data based on the provided ID
            const userData = await UserType.findById(id);

            if (!userData) {
                return res.status(404).send({ status:404,message: "User not found",data:'' });
            }

            const existingPlaylistIds = userData.playList.map(item => item._id.toString()); // Convert ObjectIds to strings for comparison

            const intersection = playlistIdFromBody.filter(id => existingPlaylistIds.includes(id));

            if (intersection.length === playlistIdFromBody.length) {
                return res.status(400).send({ message: "Playlist already exists" });
            }

            const newPlaylistIds = playlistIdFromBody.filter(id => !existingPlaylistIds.includes(id));

            // Fetch playlist data based on the IDs that are not already in the user's playlist
            const playlistData = await Category.find({ _id: { $in: newPlaylistIds } });

            // Update the user's playlist with the new playlist data
            userData.playList.push(...playlistData);

            // Save the updated user data
            await userData.save();

            // Fetch and return the updated user data
            const updatedUserData = await UserType.findById(id);
            res.status(200).send({status:200,message:"Playlist Alloted Successfully", data: updatedUserData });
        } else {
            res.status(404).send({ status:404,message: "User id is required",data:'' });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.deleteUserTypePlayList = async (req,res) => {
    try{
        const { userTypeId, userTypePlayListId } = req.params;
        if(!userTypeId || !userTypePlayListId){
            res.status(400).send( { status:400, message : "User id is required", data:'' } )
        }

        const updatedUser = await UserType.findByIdAndUpdate(
            {_id : new mongoose.Types.ObjectId(userTypeId)},
            { $pull: { "playList": { _id : new mongoose.Types.ObjectId(userTypePlayListId) } } },
            { new: true }
        );

        if(!updatedUser){
            res.status(404).send({status:404, message:"User not found", data:''})
        }
        res.status(204).send({status:204,message:"Playlist Delete Successfully",data:""});
    }
    catch(error){
        res.status(400).send( { status:400, message : error.message } )
    }
}

exports.moveUpVideo=async(req,res)=>{
    try{
        const playlistId=req.params.playlistId
        const sNo=req.params.sNo
        const playlistExist=await Category.findById({_id:playlistId})
        if (!playlistExist) {
            return res.status(404).json({
              status: "FAILED",
              message: "Playlist not found",
            });
          }
          console.log("playlistExist",playlistExist)
          const videoIndex = playlistExist.video.findIndex((item) => {
            console.log("sNo:", Number(sNo),item);
            console.log("item.sNo:", item.sNo,item.sNo === Number(sNo));
            return item.sNo === Number(sNo);
        });
        if (videoIndex === -1) {
            return res.status(404).json({
              status: 400,
              message: "Video with sNo not found",
            });
          }
        if (videoIndex === 0) {
            return res.status(400).json({
              status: 400,
              message: "Video is already at the top",
            });
          }
        const temp=playlistExist.video[videoIndex]
        playlistExist.video[videoIndex]=playlistExist.video[videoIndex-1]
        playlistExist.video[videoIndex-1]=temp
        playlistExist.video[videoIndex-1]-1
        const data=await playlistExist.save()
        res.status(200).send({status:200, message:"User not found", data:data})
    }catch(error){
        console.log("err",error)
        res.status(400).send({status:400, message:"User not found", data:error})

    }
}

exports.moveDownVideo=async(req,res)=>{ 
    try{
        const playlistId=req.params.playlistId
        const sNo=req.params.sNo
        const playlistExist=await Category.findById({_id:playlistId})
        if (!playlistExist) {
            return res.status(404).json({
              status: "FAILED",
              message: "Playlist not found",
            });
          }
          console.log("playlistExist",playlistExist)
          const videoIndex = playlistExist.video.findIndex((item) => {
            console.log("sNo:", Number(sNo),item);
            console.log("item.sNo:", item.sNo,item.sNo === Number(sNo));
            return item.sNo === Number(sNo);
        });
        if (videoIndex === -1) {
            return res.status(404).json({
              status: 400,
              message: "Video with sNo not found",
            });
          }
        const temp=playlistExist.video[videoIndex]
        playlistExist.video[videoIndex]=playlistExist.video[videoIndex+1]
        playlistExist.video[videoIndex+1]=temp
        playlistExist.video[videoIndex+1]+1
        const data=await playlistExist.save()
        res.status(200).send({status:200, message:"User not found", data:data})
    }catch(error){
        console.log("err",error)
        res.status(400).send({status:400, message:"User not found", data:error})

    }
}