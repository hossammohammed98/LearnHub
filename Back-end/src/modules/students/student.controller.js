const BaseController = require('../../shared/core/BaseController');
const StudentService = require('./student.service');

class StudentController extends BaseController{
    constructor(){
        super(StudentService);
    }
}
module.exports=new StudentController();