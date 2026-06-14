class ApiResponse{
    static success(res,message,data=null,statusCode=200)
    {
        return res.status(statusCode).json({
            success:true,
            statusCode,
            message,
            data,
            timeStamp:new Date.toISOString()
        });
    }
    static created(res,message,data=null){
        return res.status(201).json({
            success:true,
            statusCode:201,
            message,
            data,
            timeStamp:new Date.toISOString()
        })    
    }
}
module.exports = ApiResponse;