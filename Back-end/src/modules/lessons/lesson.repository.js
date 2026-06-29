const Lesson = require('./lesson.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class LessonRepository extends BaseRepository{
    constructor(){
        super(Lesson);
    }
}
module.exports =new LessonRepository();