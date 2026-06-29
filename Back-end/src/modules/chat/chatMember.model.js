const mongoose = require('mongoose');

const chatMemberSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The userId is required"],ref:'User'},
    chatId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The chatId is required"],ref:'Chat'},
    unreadCount: {type: Number,default: 0,min: [0, "Unread count cannot drop below zero"]},
},{timestamps:true});
chatMemberSchema.index({ userId: 1, chatId: 1 }, { unique: true });
module.exports = mongoose.model('ChatMember',chatMemberSchema);
