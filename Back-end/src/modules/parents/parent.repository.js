const Parent = require('./parent.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class ParentRepository extends BaseRepository{
    constructor(){
        super(Parent);
    }
}
module.exports = ParentRepository;