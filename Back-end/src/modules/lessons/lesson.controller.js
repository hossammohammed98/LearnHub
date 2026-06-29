const ApiResponse = require('../../shared/core/ApiResponse');
const BaseController = require('../../shared/core/BaseController');
const catchAsyncHandler = require('../../shared/utils/catchAsyncHandler');
const LessonService = require('./lesson.service');

class LessonController extends BaseController {
    constructor() {
        super(LessonService);
    }
    deleteLessonAsset = catchAsyncHandler(async (req, res, next) => {

        const { lessonId, assetType } = req.params;
        const result=await LessonService.deleteLessonAsset(lessonId,assetType);
        return ApiResponse.success(res,"The Asset Deleted Successfully",result,200);
    });
}
module.exports = new LessonController();
