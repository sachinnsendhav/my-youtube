const jwt = require('jsonwebtoken');
const authentication=(req,res,next)=>{
    console.log("inside middle",req.headers.authorization?.split(" ")?.[1])
    var token=req.headers.authorization;
    jwt.verify(token,"my-youtube",(err,decoded)=>{
         if (err) {
            console.log("err",err)
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // Store the decoded user data in the request object
      req.user = decoded;
      console.log("req",decoded)
      next();
    })

}

module.exports=authentication