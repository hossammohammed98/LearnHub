const createAccessToken=require('../../shared/utils/createAccessToken')
const createRefreshToken=require('../../shared/utils/createRefreshToken')
const authRepository=require('../auth/auth.repository')
const ApiError=require('../../shared/core/ApiError')
const { comparePassword } = require('../../shared/utils/hashHelper')
const { insertOne } = require('../users/user.model')
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
    if(!newUser)
        throw new ApiError(400,"Can Not Create New User"); 
    const accessToken= createAccessToken({id:newUser._id,role:newUser.Role});
    const refreshToken=createRefreshToken({id:newUser._id,role:newUser.Role});
    await authRepository.updateRefreshToken(newUser._id,refreshToken);
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