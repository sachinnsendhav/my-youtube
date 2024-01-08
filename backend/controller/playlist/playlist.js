const Category = require('../../model/playlist/playlist');

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
            name: category.name,
            description: category.description,
        };
        res.status(200).send({ status:200, data:responseData });
    }
    catch(error){
        return res.status(400).send({ status:400, message:error.message });
    }
}

exports.removePlaylist = async(req,res) => {
    try{
        const paylistId = req.params.paylistId;
        
        console.log("req123",req.params.paylistId)
        const paylistExist=await Category.findById({_id:paylistId})
        if (!paylistExist) {
            return res.status(404).send({
                status: "404",
                mesage: "Paylist with this id not found",
              })
        }
        await Category.deleteOne({_id:userId})
        res.status(204).send({ status:204, data:'' });
    }
    catch(error){
        return res.status(400).send({ status:400, message:error.message });
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
        res.status(500).json({ message: 'Internal Server Error',error:error});
    }
}

exports.getadminPlaylist=async(req,res)=>{
try{
    const adminId=req.params.adminId
    let playlistData=await Category.find({userId:adminId})
    res.status(200).json({data:playlistData})
}catch(error){
    console.error(err.message);
    res.status(500).send("Server error");
}
}