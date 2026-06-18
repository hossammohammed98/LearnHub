const AssignmentRepository = require("./assignment.repository");
const BaseService = require("../../shared/core/BaseService");

class AssignmentService extends BaseService {
  constructor() {
    super(AssignmentRepository);
  }
}
module.exports =new AssignmentService();
