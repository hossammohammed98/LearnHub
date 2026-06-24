const ChatRepository = require("./chat.repository");
const baseService = require("../../shared/core/BaseService");
class ChatService extends baseService {
  constructor() {
    super(ChatRepository);
  }
  async isUserInChat(chatId, userId) {
    return await ChatRepository.isUserInChat(chatId, userId);
  }
}
module.exports = ChatService;
