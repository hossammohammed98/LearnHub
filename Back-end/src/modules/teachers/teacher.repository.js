const Teacher = require('./teacher.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class TeacherRepository extends BaseRepository{
    constructor(){
        super(Teacher);
    }
}
module.exports = TeacherRepository;