const TeacherRepository = require("./teacher.repository");
const BaseService = require("../../shared/core/BaseService");

class TeacherService extends BaseService {
  constructor() {
    super(TeacherRepository);
  }
}
module.exports =new TeacherService();
