const jwt=require('jsonwebtoken')
const ApiError=require('../shared/core/ApiError')
exports.socketAuth=(socket,next)=>{
    const token=socket.handshake.auth.token||socket.handshake.headers['authorization'];
    if(!token)
        return next(new ApiError(404,"Token Missing"));
    try{
    const decode=jwt.verify(token.replace('Bearer ',''),process.env.SECRET_ACCESS_KEY);
    socket.user=decode;
    next();
    }
    catch(error){
        return next(new ApiError(401,"Invalid Token"))
    }

}
