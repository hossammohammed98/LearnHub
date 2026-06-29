const jwt=require('jsonwebtoken')
exports.createRefreshToken=(payload)=>{
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