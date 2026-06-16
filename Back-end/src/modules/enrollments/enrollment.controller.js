const BaseController = require('../../shared/core/BaseController');
const EnrollmentService = require('./enrollment.service');

class EnrollmentController extends BaseController{
    constructor(){
        super(EnrollmentService);
    }
}
module.exports=EnrollmentController;