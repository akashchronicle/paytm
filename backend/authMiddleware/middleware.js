const jwt=require('jsonwebtoken')
const { JWT_SECRET } = require('../config');
const authMiddlewareCheck= async(req,res,next)=>{
    const authheaders=req.headers.authorization;
    if(!authheaders || !authheaders.startsWith('Bearer')){
        return res.status(401).json({})
    }
    const token= authheaders.split(' ')[1];
    try {
        const decoded=jwt.verify(token,JWT_SECRET);
        req.userId=decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({})
    }
   
}
module.exports={
    authMiddlewareCheck
}
