const User = require('./user.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class UserRepository extends BaseRepository{
    constructor(){
        super(User);
    }
}
module.exports = UserRepository;