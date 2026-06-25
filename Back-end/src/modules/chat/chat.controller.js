const BaseController = require('../../shared/core/BaseController');
const ChatService = require('./chat.service');
class ChatController extends BaseController{
    constructor(){
        super(BaseController);
    }
}
module.exports =new ChatController();