const videoDetails = require("../../model/user/videoModel");
 module.exports={

video:async(req,res) => {
    console.log(req.user.paylod,"auth req user");
    try{
        const role = req.user.paylod.role;
        if(role == 'user'){
           return  res.status(401).send( { status:401, message:"Not Authorized" } );
        }
        const { videoName, videoDescription, videoUrl, category} = req.body;
        const payload = {  videoName, videoDescription, videoUrl, category };
        const video = new videoDetails(payload);
        await video.save();
        res.status(200).send( { status:200, message:"Video details has been added successfully" } );
    }
    catch(error){
        console.log("err",error)
        return res.status(400).send( { status:400, message:error.message } );

    }
},
getVideo:async(req,res,next)=>{
    try {
        const videos = await videoDetails.find();
        console.log(videos);
        res.status(200).send({ status: 200, data: videos });
    } catch (error) {
        console.log("err", error);
        return res.status(400).send({ status: 400, message: error.message });
    }
}
}