const Chapter = require('./chapter.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class ChapterRepository extends BaseRepository{
    constructor(){
        super(Chapter);
    }
}
module.exports =new ChapterRepository();