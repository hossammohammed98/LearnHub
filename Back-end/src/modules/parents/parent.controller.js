const BaseController = require('../../shared/core/BaseController');
const ParentService = require('./parent.service');

class ParentController extends BaseController{
    constructor(){
        super(ParentService);
    }
}
module.exports=new ParentController();