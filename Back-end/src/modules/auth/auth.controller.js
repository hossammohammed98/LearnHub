const catchAsyncHandler=require('../../shared/utils/catchAsyncHandler')
const ApiResponse=require('../../shared/core/ApiResponse');
const authService=require('./auth.service');
const ApiError = require('../../shared/core/ApiError');
const crypto=require('crypto');
//Register
exports.register=catchAsyncHandler(async(req,res,next)=>{
    const result=await authService.register(req.body);
    res.cookie('refreshToken',result.refreshToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:7*24*60*60*1000,
        secure:process.env.NODE_ENV === 'production'
    })
    res.cookie('accessToken',result.accessToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:15*60*1000,
        secure:process.env.NODE_ENV === 'production'
    })
    return  ApiResponse.success(res,"The User Add Successfully",result.user,200);
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
     res.cookie('accessToken',result.accessToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:15*60*1000,
        secure:process.env.NODE_ENV === 'production'
    })
    return ApiResponse.success(res,"The User Logging Successfully",result.user,200);
})
//Refresh Token
exports.refreshToken=catchAsyncHandler(async(req,res,next)=>{
    const incomingRefreshToken = req.cookies.refreshToken;
    if (!incomingRefreshToken) {
        return next(new ApiError(401, "Refresh token missing"));
    }
    
    const accessToken=await authService.refreshToken(req.user,incomingRefreshToken);
    res.cookie('accessToken',accessToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:15*60*1000,
        secure:process.env.NODE_ENV === 'production'
    })
    return  ApiResponse.success(res,"The Token Refreshed Successfully",accessToken,200);
})
//logout
exports.logout=catchAsyncHandler(async(req,res,next)=>{
    const result=await authService.logOut(req.payload);
    res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
    });
    return  ApiResponse.success(res,"The user Log Out Successfully",null,200);
})
//verify Email
exports.verifyEmail=catchAsyncHandler(async(req,res,next)=>{
    const {token}=req.body;
    if(!token)
        return next(new ApiError(400,"The Verification Token Is Missing"));
    const result=await authService.verifyEmail(token);
    return  ApiResponse.success(res,"The Email verification Successfully",result,200);
})
//ask to reset password
exports.forgetPassword=catchAsyncHandler(async(req,res,next)=>{
    const {Email}=req.body;
    await authService.forgetPassword(Email);
    return  ApiResponse.success(res,'إذا كان البريد الإلكتروني مسجلاً لدينا، ستتلقى رابطاً لإعادة التعيين قريباً.',null,200);
})
//the user reset password
exports.resetPassword=catchAsyncHandler(async(req,res,next)=>{
    const {token,newPassword}=req.body;
    if(!token||!newPassword)
        return next(new ApiError(400,"The ResetPassword Token or New Password Is Missing"));
    const result=await authService.resetPassword(token,newPassword);
    return  ApiResponse.success(res,'تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.',null,200);
})