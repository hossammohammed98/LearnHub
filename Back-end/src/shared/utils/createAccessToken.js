const jwt=require('jsonwebtoken')
exports.createAccessToken=(payload)=>{
   const token=jwt.sign(
   payload,
   process.env.SECRET_ACCESS_KEY
   ,
   {
   expiresIn:"15m"
   }
   )
   return token;
}