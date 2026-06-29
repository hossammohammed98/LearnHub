const AssistantRepository = require("./assistant.repository");
const BaseService = require("../../shared/core/BaseService");

class AssistantService extends BaseService {
  constructor() {
    super(AssistantRepository);
  }
}
module.exports =new AssistantService();
