const ApiError=require('../shared/core/ApiError')
const jwt=require('jsonwebtoken')
exports.verifyToken=(req,res,next)=>{
    const authHeader=req.Headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, "Unauthorized: No token provided"));
    }
    const token = authHeader.split(' ')[1];
    try{
        const decode=jwt.verify(token,process.env.SECRET_ACCESS_KEY)
        req.user=decode;
        next();
    }
    catch(error){
       if (error.name === 'TokenExpiredError') {
            return next(new ApiError(401, "Unauthorized: Token has expired"));
        }
        return next(new ApiError(401, "Unauthorized: Invalid token"));
    }
 
}