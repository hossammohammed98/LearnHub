const BaseRepository = require('../../shared/core/BaseRepository');
const chatModel = require('./chat.model');
const chatMember = require('./chatMember.model');
class ChatRepository extends BaseRepository{
    constructor(){
        super(chatModel);
    }
    async isUserInChat(chatId,userId){
        const chat = await chatMember.find({chatId:chatId});
        if(!chat && chat.userId!==userId)
            return false;
        else
            return true;
    }
}
module.exports =new ChatRepository();