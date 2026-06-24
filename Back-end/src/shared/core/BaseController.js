const catchAsyncHandler = require("../utils/catchAsyncHandler");
const ApiError = require("./ApiError");
const ApiResponse = require("./ApiResponse");

class BaseController {
    constructor(service) {
        this.service = service;
    }
    getAll = catchAsyncHandler(async(req, res, next) => {
        const data = await this.service.getAll();
        return new ApiResponse.success(res, "The Data Returned Successfully", data);
    })
    getById = catchAsyncHandler(async(req, res, next) => {
        const id = req.params.id;
        const data = await this.service.getById(id);
        if (!data)
            throw new ApiError(404, `Not Found Item With THis ${id}`);
        return new ApiResponse.success(res, "The Data Returned Successfully", data);
    })
    create = catchAsyncHandler(async(req, res, next) => {
        const data = await this.service.create(req.body);
        return new ApiResponse.created(res, "The Item Added Successfully", data);
    })
    update = catchAsyncHandler(async(req, res, next) => {
        const data = await this.service.update(req.params.id, req.body);
        if (!data)
            throw new ApiError(404, `Not Found Item With THis ${req.params.id}`);
        return new ApiResponse.success(res, "The Item updated Successfully", data);
    })
    delete = catchAsyncHandler(async(req, res, next) => {
        const data = await this.service.delete(req.params.id);
        if (!data)
            throw new ApiError(404, "this item not avilable at this moment");
        return new ApiResponse.success(res, "this item is going to the hell ", data);
    })
}
module.exports=BaseController;