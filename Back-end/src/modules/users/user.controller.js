const BaseController = require('../../shared/core/BaseController');
const userService = require('./user.service');

class UserController extends BaseController{
    constructor(){
        super(userService);
    }
}
module.exports=new UserController();