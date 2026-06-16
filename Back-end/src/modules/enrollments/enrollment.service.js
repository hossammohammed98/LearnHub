const EnrollmentRepository = require("./enrollment.repository");
const BaseService = require("../../shared/core/BaseService");

class EnrollmentService extends BaseService {
  constructor() {
    super(EnrollmentRepository);
  }
}
module.exports = EnrollmentService;
