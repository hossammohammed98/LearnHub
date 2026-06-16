const bcrypt=require('bcrypt');
const saltRound=10;

exports.hashPassword=async(plainPassword)=>{
   return await bcrypt.hash(plainPassword,saltRound);
}
exports.comparePassword=async(plainPassword,hashedPassword)=>{
    return await bcrypt.compare(plainPassword,hashedPassword);
}