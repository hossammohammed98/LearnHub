const ApiError = require("../shared/core/ApiError");

exports.restrictTo=(...roles)=>(req,res,next)=>{
    if (!req.user || !req.user.role) 
        return next(new ApiError(401, "Unauthorized: User session not found"));
    if (!roles.includes(req.user.role)) 
        return next(new ApiError(403, "Forbidden: You do not have permission to perform this action"));
    next();
}