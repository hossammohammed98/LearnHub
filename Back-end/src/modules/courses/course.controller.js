const ApiResponse = require('../../shared/core/ApiResponse');
const BaseController = require('../../shared/core/BaseController');
const catchAsyncHandler = require('../../shared/utils/catchAsyncHandler');
const CourseService = require('./course.service');

class CourseController extends BaseController {
    constructor() {
        super(CourseService);
    }
    getCourseUploadToken = catchAsyncHandler(async (req, res, next) => {
        const result = await CourseService.getCourseUploadToken(req.user, req.body);
        return ApiResponse.success(res, "The Course Item token return successfully", result, 200)
    })

    saveDraft = catchAsyncHandler(async (req, res, next) => {
        const result = await CourseService.saveCourseWorkflow(req.user, req.body, 'draft');
        return ApiResponse.success(res, "Course draft saved successfully", result, 200);
    })

    publish = catchAsyncHandler(async (req, res, next) => {
        const result = await CourseService.saveCourseWorkflow(req.user, req.body, 'published');
        return ApiResponse.success(res, "Course published successfully", result, 200);
    })

    getById = catchAsyncHandler(async (req, res, next) => {
        const result = await CourseService.getCourseDetails(req.user, req.params.id);
        return ApiResponse.success(res, "Course details returned successfully", result, 200);
    })

    getMyCourses = catchAsyncHandler(async (req, res, next) => {
        const result = await CourseService.getMyCourses(req.user);
        return ApiResponse.success(res, "My courses returned successfully", result, 200);
    })

    getDashboardSummary = catchAsyncHandler(async (req, res, next) => {
        const result = await CourseService.getStudentDashboardSummary(req.user);
        return ApiResponse.success(res, "Student dashboard summary returned successfully", result, 200);
    })

    update = catchAsyncHandler(async (req, res, next) => {
        const result = await CourseService.updateCourseMeta(req.user, req.params.id, req.body);
        return ApiResponse.success(res, "Course updated successfully", result, 200);
    })

    delete = catchAsyncHandler(async (req, res, next) => {
        const result = await CourseService.deleteCourseWorkflow(req.user, req.params.id);
        return ApiResponse.success(res, "Course deleted successfully", result, 200);
    })
   
}
module.exports = new CourseController();
