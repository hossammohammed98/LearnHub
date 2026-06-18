const User=require('../users/user.model')
exports.createUser=async (data)=>{
    return await User.create(data);
}
exports.findUserByEmailWithPassword=async (email)=>{
    return await User.findOne({Email:email}).select('+Password');
}
exports.findUserByIdWithToken=async (id)=>{
    return await User.findById(id).select('+RefreshToken');
}
exports.updateRefreshToken=async(userId,token)=>{
    return await User.findByIdAndUpdate(userId,{RefreshToken:token},{new:true});
}
exports.findUserByVerifyToken=async(hashedToken)=>{
    return await User.
    findOne({verificationToken:hashedToken,verificationTokenExpires: { $gt: Date.now() }});
}
exports.findUserByPasswordResetToken=async(hashedToken)=>{
    return await User.
    findOne({passwordResetToken:hashedToken,passwordResetTokenExpires: { $gt: Date.now() }});
}
