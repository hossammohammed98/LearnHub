const jwt=require('jsonwebtoken')
const cookie=require('cookie')
const ApiError=require('../shared/core/ApiError')
exports.socketAuth=(socket,next)=>{
    const headerCookie=socket.handshake.headers.cookie;

    if(!headerCookie)
        return next(new Error("cookies Missing"));
    const parserCookie=cookie.parse(headerCookie);
    const token=parserCookie.accessToken;
    if(!token)
        return next(new Error("Token Missing"))
    try{
    const decode=jwt.verify(token,process.env.SECRET_ACCESS_KEY);
    socket.user=decode;
    next();
    }
    catch(error){
        return next(new ApiError(401,"Invalid Token"))
    }

}
