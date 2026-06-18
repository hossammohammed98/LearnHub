const ParentRepository = require("./parent.repository");
const BaseService = require("../../shared/core/BaseService");

class ParentService extends BaseService {
  constructor() {
    super(ParentRepository);
  }
}
module.exports = ParentService;
