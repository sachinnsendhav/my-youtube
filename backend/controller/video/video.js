const videoDetails = require("../../model/user/videoModel");
const playlist = require("../../model/playlist/playlist");
module.exports = {
  video: async (req, res) => {
    console.log(req.user.paylod, "auth req user");
    try {
      const role = req.user.paylod.role;
      if (role == "user") {
        return res.status(401).send({ status: 401, message: "Not Authorized" });
      }
      const { videoName, videoDescription, videoUrl, playListId } = req.body;
      const playListById = await playlist.findById({ _id: playListId });
      if (!playListById) {
        return res
          .status(404)
          .send({ status: 404, message: "PlayList with Id not found" });
      }
      // const payload = {  videoName, videoDescription, videoUrl, playListId, userId:req.user.paylod._id };
      playListById.video.push({
        videoName: videoName,
        videoDescription: videoDescription,
        videoUrl: videoUrl,
      });
      const videoData = await playListById.save();
      // const userData=await playlist.findByIdAndUpdate({_id:playListId},
      //     {
      //         $push:{
      //         video:{
      //             videoName: videoName,
      //             videoDescription: videoDescription,
      //             videoUrl: videoUrl,
      //         }
      //     }},{new:true})

      res
        .status(200)
        .send({
          status: 200,
          message: "Video details has been added successfully",
          data: videoData,
        });
    } catch (error) {
      console.log("err", error);
      return res.status(400).send({ status: 400, message: error.message });
    }
  },
  getVideo: async (req, res, next) => {
    try {
      const playListId = req.params.playListId;
      const videos = await playlist.findById({ _id: playListId });
      res.status(200).send({ status: 200, message: "Success", data: videos });
    } catch (error) {
      console.log("err", error);
      return res.status(400).send({ status: 400, message: error.message });
    }
  },
  deleteVideo: async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const paylistId = req.query.paylistId;
      const role = req.user.paylod.role;
      if (role == "user") {
        return res.status(401).send({ status: 401, message: "Not Authorized" });
      }
      const playlistExist = await playlist.findById({ _id: paylistId });
      if (!playlistExist) {
        return res
          .status(404)
          .send({ status: 404, message: "Playlist not found" });
      }
      const playlistVideoExist = await playlist.updateOne(
        { _id: paylistId },
        { $pull: { video: { _id: videoId } } }
      );
      if (playlistVideoExist.modifiedCount === 0) {
        return res
          .status(404)
          .send({ status: 404, message: "Video not found in playlist" });
      }
      await playlist.updateOne(
        { _id: paylistId },
        { $inc: { "video.$[].sNo": -1 } }
      );
      res
        .status(204)
        .send({ status: 204, message: "Video Deleted Sucessfully", data: "" });
    } catch (error) {
      res.status(400).send({ status: 400, message: error.message, data: "" });
    }
  },
  getAllVideos: async (req, res) => {
    try {
      const userId = req.user.paylod._id;
      if (!userId) {
        res
          .status(404)
          .send({ status: "Not found", message: `Invalid request`, data: "" });
      }
      console.log(userId);
      const video_data = await videoDetails.find({ userId: userId });
      res
        .status(200)
        .send({
          status: "Sucess",
          message: "Data fetch successfully",
          data: video_data,
        });
    } catch (error) {
      res.status(400).send({ status: 400, message: error.message, data: "" });
    }
  },
};
