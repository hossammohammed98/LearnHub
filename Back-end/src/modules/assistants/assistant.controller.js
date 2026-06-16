const BaseController = require('../../shared/core/BaseController');
const AssistantService = require('./assistant.service');

class AssistantController extends BaseController{
    constructor(){
        super(AssistantService);
    }
}
module.exports=AssistantController;