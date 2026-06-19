const LessonRepository = require("./lesson.repository");
const BaseService = require("../../shared/core/BaseService");

class LessonService extends BaseService {
  constructor() {
    super(LessonRepository);
  }
}
module.exports =new LessonService();
