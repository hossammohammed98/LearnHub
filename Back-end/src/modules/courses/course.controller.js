const ApiResponse = require('../../shared/core/ApiResponse');
const BaseController = require('../../shared/core/BaseController');
const catchAsyncHandler = require('../../shared/utils/catchAsyncHandler');
const CourseService = require('./course.service');

class CourseController extends BaseController {
    constructor() {
        super(CourseService);
    }
    getCourseUploadToken = catchAsyncHandler(async (req, res, next) => {
        const { courseId, chapterId, lessonId, fileType } = req.body;
        const result = await CourseService.getCourseUploadToken(courseId, chapterId, lessonId, fileType);
        return ApiResponse.success(res, "The Course Item token return successfully", result, 200)
    })
   
}
module.exports = new CourseController();