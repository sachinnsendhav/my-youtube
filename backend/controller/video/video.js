const videoDetails = require("../../model/user/videoModel");
 
exports.video = async(req,res) => {
    try{
        const { videoName, videoDescription, videoUrl, videoTags, category} = req.body;
        const payload = {  videoName, videoDescription, videoUrl, videoTags, category };
        const video = new videoDetails(payload);
        await video.save();
        res.status(200).send( { status:200, message:"Video details has been added successfully" } );
    }
    catch(error){
        return res.status(400).send( { status:400, message:error.message } );
    }
}