const BaseRepository = require('../../shared/core/BaseRepository');
const chatModel = require('./chat.model');
const chatMember = require('./chatMember.model');
const messageModel=require('./message.model');
class ChatRepository extends BaseRepository{
    constructor(){
        super(chatModel);
    }
    async isUserInChat(chatId,userId){
        const chat = await chatMember.findOne({chatId:chatId});
        if(!chat && chat.userId!==userId)
            return false;
        else
            return true;
    }
    async getCurrentMemberData(chatId,userId){
        return await chatMember.findOne({chatId,userId});
    }
    async getMyMemberShip(userId){
        return await chatMember.find({userId:userId}).select('chatId');
    }
    async chatsWithAllData(chatIds){
        return await chatModel.find({_id:{$in:chatIds}})
        .populate({path:'lastMessage',select:'content messageType createdAt senderId'})
        .sort({createdAt:-1})
    }
    async getReceiverMember(chatId,userId){
        return await chatMember.findOne({chatId:chatId,userId:{$ne:userId}})
        .populate({path:"userId",select:"FName LName Avatar activeStatus"});
    }
    async getChatMessages(chatId){
        return await messageModel.find({chatId:chatId})
        .populate({path:'senderId',select:'FName LName Avatar'});
    }
    async createMessage(newMessage){
        return await messageModel.create(newMessage);
    }
    async updateLastMessage(chatId,newMessageId){
        const chat=await chatModel.findById(chatId);
        if(!chat)
            return;
        chat.lastMessage=newMessageId;
        chat.save();
        return chat;
    }
    async updateUnreadStatus(chatId,userId){
        const chat=await chatMember.findOneAndUpdate({ chatId: chatId, userId: userId },
        { $set: { unreadCount: 0 } },
        { new: true })
        return true;
    }

}
module.exports =new ChatRepository();