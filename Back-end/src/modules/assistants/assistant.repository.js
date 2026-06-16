const Assistant = require('./assistant.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class AssistantRepository extends BaseRepository{
    constructor(){
        super(Assistant);
    }
}
module.exports = AssistantRepository;