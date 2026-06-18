const BaseController = require('../../shared/core/BaseController');
const TeacherService = require('./teacher.service');

class TeacherController extends BaseController{
    constructor(){
        super(TeacherService);
    }
}
module.exports=TeacherController;