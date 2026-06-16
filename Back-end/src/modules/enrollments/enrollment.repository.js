const Enrollment = require('./enrollment.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class EnrollmentRepository extends BaseRepository{
    constructor(){
        super(Enrollment);
    }
}
module.exports = EnrollmentRepository;