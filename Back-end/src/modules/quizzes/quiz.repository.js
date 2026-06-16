const Quiz = require('./quiz.model');
const BaseRepository = require('../../shared/core/BaseRepository');
class QuizRepository extends BaseRepository{
    constructor(){
        super(Quiz);
    }
}
module.exports = QuizRepository;