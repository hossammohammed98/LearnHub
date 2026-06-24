const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The SenderId is required"],ref:'User'},
    chatId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The UserId is required"],ref:'Chat'},
    content:{type:String ,required:[true,"The content is required"]}
},{timestamps:true});
module.exports = mongoose.model('Message',messageSchema);
