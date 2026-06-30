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

    const memberships = await ChatRepository.getMyMemberShip(userId);

    const chatIds = memberships
      .map(m => m.chatId ? m.chatId.toString() : null)
      .filter(id => id !== null);

    // If the user isn't part of any chat rooms, exit cleanly without hitting the database query
    if (chatIds.length === 0) {
      return [];
    }
    const chatsData = await ChatRepository.chatsWithAllData(chatIds);

    const formattedRooms = await Promise.all(chatsData.map(async (chat) => {
      if (!chat) return null;

      let roomInfo = typeof chat.toObject === 'function' ? chat.toObject() : { ...chat };

      let mappedName = "مستخدم غير معروف";
      let mappedAvatar = "/images/login.jpg";

      if (chat.type === 'private') {
        const receiverMember = await ChatRepository.getReceiverMember(chat._id, userId);
        // Now this check safely evaluates because receiverMember is an object
        if (receiverMember && receiverMember.userId) {
          mappedName = this.getUserDisplayName(receiverMember.userId);
          mappedAvatar = receiverMember.userId.Avatar || mappedAvatar;
          roomInfo.receiverId = receiverMember.userId._id;
        }
      } else {
        mappedName = chat.groupName || "مجموعة غير مسماة";
        mappedAvatar = chat.groupAvatar || "/images/group-avatar.jpg";
      }

      const currentMemberData = await ChatRepository.getCurrentMemberData(chat._id, userId);

      let displayLastMessage = "لا توجد رسائل في هذه المحادثة";
      let displayTime = "الآن";
      let sortingTimestamp = chat.createdAt;

      if (chat.lastMessage) {
        // NOTE: Make sure your frontend checks content or messageText based on your DB schema mapping!
        displayLastMessage = chat.lastMessage.messageType === 'file'
          ? `📎 ملف مرفق: ${chat.lastMessage.attachment?.fileName || 'ملف'}`
          : chat.lastMessage.content || chat.lastMessage.messageText || displayLastMessage;

        if (chat.lastMessage.createdAt) {
          const msgDate = new Date(chat.lastMessage.createdAt);
          displayTime = msgDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
          sortingTimestamp = chat.lastMessage.createdAt;
        }
      }

      return {
        id: chat._id.toString(),
        userName: mappedName,
        imgUrl: mappedAvatar,
        lastMessage: displayLastMessage,
        time: displayTime,
        unreadCount: currentMemberData ? currentMemberData.unreadCount : 0,
        _sortingDate: new Date(sortingTimestamp)
      };
    }));

    return formattedRooms
      .filter(Boolean)
      .sort((a, b) => b._sortingDate - a._sortingDate);
  }
  getUserDisplayName(user) {
    const fullName = `${user.FName || ''} ${user.LName || ''}`.trim();
    return fullName || user.Email || user.Phone || "مستخدم غير معروف";
  }
  async getChatMessages(chatId, userId) {
    const chatMessages = await ChatRepository.getChatMessages(chatId);
    const formattedMessage = await Promise.all(chatMessages.map((message) => {
      let messageInfo = message.toObject();
      messageInfo.userName = message.senderId ? this.getUserDisplayName(message.senderId) : "مستخدم غير معروف";
      messageInfo.Avatar = message.senderId?.Avatar;
      messageInfo.myMessage = message.senderId ? (message.senderId._id.toString() === userId.toString()) : false;
      delete messageInfo.senderId;
      return messageInfo;
    }))
    return formattedMessage;
  }
  async getChatAttachmentToken(chatId, fileType) {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary configuration is missing');
    }

    const folderPath = `tallem/chat/${chatId}/attachments`;
    let resourceType = 'raw';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType?.toLowerCase())) {
      resourceType = 'image';
    }
    const signatureOptions = {
      folder: folderPath,
    }
    const signatureData = generateSignature(signatureOptions);

    return {
      ...signatureData,
      resourceType
    };
  }

  async saveUploadedChatAttachment(chatId, senderId, cloudinaryData) {
    const { secureUrl, fileName, fileSize, isText = false } = cloudinaryData;
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
  async clearUnreadCount(chatId, userId) {
    await ChatRepository.updateUnreadStatus(chatId, userId);
    return true;
  }

}
module.exports = new ChatService();
