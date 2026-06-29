const StudentRepository = require("./student.repository");
const BaseService = require("../../shared/core/BaseService");

class StudentService extends BaseService {
  constructor() {
    super(StudentRepository);
  }
}
module.exports =new StudentService();
