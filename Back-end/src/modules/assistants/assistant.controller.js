const BaseController = require('../../shared/core/BaseController');
const AssistantService = require('./assistant.service');
const catchAsyncHandler = require('../../shared/utils/catchAsyncHandler');
const ApiError = require('../../shared/core/ApiError');
const ApiResponse = require('../../shared/core/ApiResponse');

class AssistantController extends BaseController{
    constructor(){
        super(AssistantService);
    }

    getAll = catchAsyncHandler(async(req, res) => {
        const data = await this.service.getAllForUser(req.user);
        return ApiResponse.success(res, "The Data Returned Successfully", data);
    })

    create = catchAsyncHandler(async(req, res) => {
        const data = await this.service.createForTeacher(req.user, req.body);
        return ApiResponse.created(res, "The Item Added Successfully", data);
    })

    update = catchAsyncHandler(async(req, res) => {
        const data = await this.service.updateForTeacher(req.user, req.params.id, req.body);
        if (!data)
            throw new ApiError(404, `Not Found Item With THis ${req.params.id}`);
        return ApiResponse.success(res, "The Item updated Successfully", data);
    })

    delete = catchAsyncHandler(async(req, res) => {
        const data = await this.service.deleteForTeacher(req.user, req.params.id);
        if (!data)
            throw new ApiError(404, "this item not avilable at this moment");
        return ApiResponse.success(res, "The Item Deleted Successfully", data);
    })
}
module.exports=new AssistantController();
