const userRepository = require("./user.repository");
const BaseService = require("../../shared/core/BaseService");

class UserService extends BaseService {
  constructor() {
    super(userRepository);
  }
}
module.exports =new UserService();
