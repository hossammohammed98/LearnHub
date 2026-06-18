const BaseController = require('../../shared/core/BaseController');
const AssignmentService = require('./assignment.service');

class AssignmentController extends BaseController{
    constructor(){
        super(AssignmentService);
    }
}
module.exports=new AssignmentController();
