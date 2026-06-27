const ChatRepository = require("./chat.repository");
const baseService = require("../../shared/core/BaseService");
const { generateSignature } = require("../../config/cloudinary");
class ChatService extends baseService {
  constructor() {
    super(ChatRepository);
  }
  async isUserInChat(chatId, userId) {
    return await ChatRepository.isUserInChat(chatId, userId);
  }
  async getAllChats(userId) {
    const allMemberShip = await ChatRepository.getMyMemberShip(userId);
    const chatsData = await ChatRepository.chatsWithAllData(allMemberShip);
    const formattedRoom = await Promise.all(chatsData.map(async (chat) => {
      let roomInfo = chat.toObject();
      if (chat.type === 'private') {
        const receiverMember = await ChatRepository.getReceiverMember(chat._id, userId);
        if (receiverMember && receiverMember.userId) {
          roomInfo.receiverName = receiverMember.userId.FName + " " + receiverMember.userId.LName;
          roomInfo.receiverAvatar = receiverMember.userId.Avatar;
          roomInfo.receiverId = receiverMember.userId._id;
        }

      }
      else {
        roomInfo.receiverName = chat.groupName;
        roomInfo.receiverAvatar = chat.groupAvatar;
      }
      const currentMemberData = await ChatRepository.getCurrentMemberData(chat._id, userId);
      roomInfo.unreadCount = currentMemberData ? currentMemberData.unreadCount : 0;
      return roomInfo;
    }))
    return formattedRoom;
  }
  async getChatMessages(chatId, userId) {
    const chatMessages = await ChatRepository.getChatMessages(chatId);
    const formattedMessage = await Promise.all(chatMessages.map((message) => {
      let messageInfo = message.toObject();
      messageInfo.userName = message.senderId.FName + " " + message.userId.LName;
      messageInfo.Avatar = message.senderId.Avatar;
      messageInfo.myMessage = (message.senderId._id.toString() === userId.toString());
      delete messageInfo.senderId;
      return messageInfo;
    }))
    return formattedMessage;
  }
  async getChatAttachmentToken(chatId, fileType) {
    const folderPath = `tallem/chat/${chatId}/attachments`;
    let resourceType = 'raw';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType?.toLowerCase())) {
      resourceType = 'image';
    }
    const signatureOptions = {
      folder: folderPath,
      resource_type: resourceType,
    }
    return generateSignature(signatureOptions);
  }

  async saveUploadedChatAttachment(chatId, senderId, cloudinaryData) {
    const { secureUrl, fileName, fileSize, isText=false } = cloudinaryData;
    let newMessageData;
    if (!isText) {
       newMessageData = {
        senderId,
        chatId,
        content: `📎 ملف مرفق: ${fileName}`,
        messageType: 'file',
        attachment: {
          fileUrl: secureUrl,
          fileName: fileName,
        }
      }
    }
    else {
       newMessageData = {
        senderId,
        chatId,
        content: fileName,
        messageType: 'text',
        attachment: {
          fileUrl: secureUrl,
          fileName: fileName,

        }
      }

    }
    const savedMessage = await ChatRepository.createMessage(newMessageData);
    await ChatRepository.updateLastMessage(chatId, savedMessage._id);
    return savedMessage;
  }

}
module.exports = new ChatService();
