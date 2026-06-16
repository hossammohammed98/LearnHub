const catchAsyncHandler=require('../../shared/utils/catchAsyncHandler')
const ApiResponse=require('../../shared/core/ApiResponse');
const authService=require('./auth.service');
//Register
exports.register=catchAsyncHandler(async(req,res,next)=>{
    const result=await authService.register(req.body);
    res.cookie('refreshToken',result.refreshToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:7*24*60*60*1000,
        secure:process.env.NODE_ENV === 'production'
    })
    return new ApiResponse.success(res,"The User Add Successfully",result.accessToken,200);
})
//Login
exports.login=catchAsyncHandler(async(req,res,next)=>{
    const result=await authService.login(req.body);
      res.cookie('refreshToken',result.refreshToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:7*24*60*60*1000,
        secure:process.env.NODE_ENV === 'production'
    })
    return new ApiResponse.success(res,"The User Logging Successfully",result.accessToken,200);
})
//Refresh Token
exports.refreshToken=catchAsyncHandler(async(req,res,next)=>{
    const incomingRefreshToken = req.cookies.refreshToken;
    if (!incomingRefreshToken) {
        return next(new ApiError(401, "Refresh token missing"));
    }
    const accessToken=await authService.refreshToken(req.payload,incomingRefreshToken);
    return new ApiResponse.success(res,"The Token Refreshed Successfully",accessToken,200);
})
//logout
exports.logout=catchAsyncHandler(async(req,res,next)=>{
    const result=await authService.logOut(req.payload);
    res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
    });
    return new ApiResponse.success(res,"The user Log Out Successfully",null,200);
})