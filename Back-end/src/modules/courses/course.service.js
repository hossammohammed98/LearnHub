const CourseRepository = require("./course.repository");
const BaseService = require("../../shared/core/BaseService");

class CourseService extends BaseService {
  constructor() {
    super(CourseRepository);
  }
}
module.exports = CourseService;
