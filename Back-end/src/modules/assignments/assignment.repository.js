const Assignment = require('./assignment.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class AssignmentRepository extends BaseRepository{
    constructor(){
        super(Assignment);
    }
}
module.exports =new AssignmentRepository();