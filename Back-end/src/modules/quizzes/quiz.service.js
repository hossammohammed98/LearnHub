const QuizRepository = require("./quiz.repository");
const BaseService = require("../../shared/core/BaseService");

class QuizService extends BaseService {
  constructor() {
    super(QuizRepository);
  }
}
module.exports =new QuizService();
