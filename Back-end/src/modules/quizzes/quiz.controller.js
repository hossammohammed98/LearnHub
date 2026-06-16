const BaseController = require('../../shared/core/BaseController');
const QuizService = require('./quiz.service');

class QuizController extends BaseController{
    constructor(){
        super(QuizService);
    }
}
module.exports=QuizController;