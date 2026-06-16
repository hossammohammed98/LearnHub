const BaseController = require('../../shared/core/BaseController');
const ChapterService = require('./chapter.service');

class ChapterController extends BaseController{
    constructor(){
        super(ChapterService);
    }
}
module.exports=ChapterController;