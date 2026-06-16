const BaseController = require('../../shared/core/BaseController');
const LessonService = require('./lesson.service');

class LessonController extends BaseController{
    constructor(){
        super(LessonService);
    }
}
module.exports=LessonController;
