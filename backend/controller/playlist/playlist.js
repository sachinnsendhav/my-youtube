const Category = require('../../model/playlist/playlist');

exports.addPlaylist = async(req,res) => {
    try{
        const { name,description,role } = req.body;
        const userId = req.user.paylod._id;
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