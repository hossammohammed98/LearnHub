const mongoose = require('mongoose');

const chatMemberSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The userId is required"],ref:'User'},
    chatId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The chatId is required"],ref:'Chat'}
},{timestamps:true});
module.exports = mongoose.model('ChatMember',chatMemberSchema);
