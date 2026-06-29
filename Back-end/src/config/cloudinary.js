const cloudinary=require('cloudinary').v2;
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure_distribution:process.env.CLIENT_URL,
})

const generateSignature=(options={})=>{
    const timestamp=Math.round(new Date().getTime()/1000);

    const paramsToSign={
        timestamp,
        ...options
    };

    const signature=cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET,
    );

    return {
        signature,
        timestamp,
        api_key:process.env.CLOUDINARY_API_KEY,
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        ...paramsToSign,
    };
}
module.exports={cloudinary,generateSignature}
