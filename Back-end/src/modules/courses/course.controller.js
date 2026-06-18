const BaseController = require('../../shared/core/BaseController');
const CourseService = require('./course.service');

class CourseController extends BaseController{
    constructor(){
        super(CourseService);
    }
}
module.exports=new CourseController();