const Student = require('./student.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class StudentRepository extends BaseRepository{
    constructor(){
        super(Student);
    }
}
module.exports =new StudentRepository();