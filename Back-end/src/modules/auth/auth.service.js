const {createAccessToken}=require('../../shared/utils/createAccessToken')
const {createRefreshToken}=require('../../shared/utils/createRefreshToken')
const authRepository=require('../auth/auth.repository')
const ApiError=require('../../shared/core/ApiError')
const { comparePassword } = require('../../shared/utils/hashHelper')
const { insertOne } = require('../users/user.model')
const emailService=require('../emails/email.service')
const crypto=require('crypto');
const sanitizeUser=(user)=>{
    const userObj=user.toObject();
    delete userObj.Password;
    delete userObj.RefreshToken;
    return userObj;
}
//Register
exports.register=async(data)=>{
    if(data.Password!=data.ConfirmPassword)
        throw new ApiError(400,"Password Not Match ConfirmPassword");
    delete data.ConfirmPassword;
    const newUser= await authRepository.createUser(data);
    console.log(newUser);
    if(!newUser)
        throw new ApiError(400,"Can Not Create New User"); 
    const accessToken= createAccessToken({id:newUser._id,role:newUser.Role});
    const refreshToken=createRefreshToken({id:newUser._id,role:newUser.Role});
    await authRepository.updateRefreshToken(newUser._id,refreshToken);
    await emailService.sendVerificationEmail(newUser);
    return {
        accessToken:accessToken,
        refreshToken:refreshToken,
        user:sanitizeUser(newUser)
    }
    
}
//Login
exports.login=async(data)=>{
    const user=await authRepository.findUserByEmailWithPassword(data.Email);
    if(!user)
        throw new ApiError(404,"The Email Or Password Is InValid");
    const isMatch= await comparePassword(data.Password,user.Password);
    if(!isMatch)
        throw new ApiError(400,"The Email Or Password Is InValid");
    const accessToken=createAccessToken({id:user.id,role:user.Role})
    const refreshToken=createRefreshToken({id:user.id,role:user.Role});
    await authRepository.updateRefreshToken(user._id,refreshToken);
     return {
        accessToken:accessToken,
        refreshToken:refreshToken,
        user:sanitizeUser(user)
    }
}

//Refresh Token
exports.refreshToken=async(payload,incomingRefreshToken)=>{
    const user=await authRepository.findUserByIdWithToken(payload.id);
    if(!user||user.Role!==payload.role||user.RefreshToken!=incomingRefreshToken)
        throw new ApiError(401,"The Token Expired or Invalid");
    return createAccessToken({id:user._id,role:user.Role})
}

//logeOut 
exports.logOut=async(payload)=>{
   return await authRepository.updateRefreshToken(payload.id,null);
}

//send verification Email
exports.verifyEmail=async(token)=>{
    const hashedToken=await crypto.createHash('sha256').update(token).digest('hex');
    const user=await authRepository.findUserByVerifyToken(hashedToken);
    if(!user)
        throw new ApiError(403,"The Verification Token Is Invalid");
   
    user.verificationToken=undefined;
    user.verificationTokenExpires=undefined;
    user.isVerified=true;
    await user.save();
    return user;
}

//ask to reset password
exports.forgetPassword=async(email)=>{
    const user=await authRepository.findUserByEmailWithPassword(email);
    if(!user)
       return ;
    await emailService.sendResetPasswordEmail(user);
    return;
}

//user reset password
exports.resetPassword=async(token,newPassword)=>{
    const hashedToken=await crypto.createHash('sha256').update(token).digest('hex');
    const user= await authRepository.findUserByPasswordResetToken(hashedToken);
    if(!user)
        throw new ApiError(403,"The Password Reset Token Is Invalid or Expired");
    user.passwordResetToken=undefined;
    user.passwordResetTokenExpires=undefined,
    user.Password=newPassword;
    user.save();
    return ;
}
