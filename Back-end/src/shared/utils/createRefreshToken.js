const jwt=require('jsonwebtoken')
exports.createAccessToken=(payload)=>{
   const token=jwt.sign(
   payload,
   process.env.SECRET_REFRESH_KEY
   ,
   {
   expiresIn:"7d"
   }
   )
   return token;
}