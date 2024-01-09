const videoDetails = require("../../model/user/videoModel");

module.exports={
    video:async(req,res) => {
        console.log(req.user.paylod,"auth req user");
        try{
            const role = req.user.paylod.role;
            if(role == 'user'){
            return  res.status(401).send( { status:401, message:"Not Authorized" } );
            }
            const { videoName, videoDescription, videoUrl, playListId} = req.body;
            const payload = {  videoName, videoDescription, videoUrl, playListId, userId:req.user.paylod._id };
            const video = new videoDetails(payload);
            const videoData=await video.save();
            res.status(200).send( { status:200, message:"Video details has been added successfully",data:videoData } );
        }
        catch(error){
            console.log("err",error)
            return res.status(400).send( { status:400, message:error.message } );

        }
    },
    getVideo:async(req,res,next)=>{
        try {
            const playListId = req.params.playListId;
            const videos = await videoDetails.find({playListId:playListId});
            res.status(200).send({ status: 200,message:"", data: videos });
        } catch (error) {
            console.log("err", error);
            return res.status(400).send({ status: 400, message: error.message });
        }
    },
    deleteVideo:async(req,res)=>{
        try{
            const videoId = req.params.videoId;
            console.log(videoId);
            const video = await videoDetails.findByIdAndDelete({_id:videoId});
            res.status(204).send({status:204, message:"Video Deleted Sucessfully", data:""});
        }
        catch(error){
            res.status(400).send({status:400, message:error.message, data:""});
        }
    },
    getAllVideos:async(req,res)=>{
        try{
            const userId = req.user.paylod._id;
            if(!userId){
                res.status(404).send({status:'Not found', message:`Invalid request`, data:''});
            }
            console.log(userId);
            const video_data = await videoDetails.find({userId:userId});
            res.status(200).send({status:'Sucess', message:'Data fetch successfully', data:video_data})
        }
        catch(error){
            res.status(400).send({status:400, message:error.message, data:""})
        }
    }
}