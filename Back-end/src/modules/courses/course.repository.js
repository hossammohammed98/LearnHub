const Course = require('./course.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class CourseRepository extends BaseRepository{
    constructor(){
        super(Course);
    }
}
module.exports = CourseRepository;