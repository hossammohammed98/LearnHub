const ApiError=require('../shared/core/ApiError')
const jwt=require('jsonwebtoken')
exports.protect=(req,res,next)=>{
    const incomingAccessToken = req.cookies.accessToken;
    // console.log(incomingAccessToken);
    if (!incomingAccessToken) {
        return next(new ApiError(401, "Unauthorized: No token provided"));
    }
    const token = incomingAccessToken;
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