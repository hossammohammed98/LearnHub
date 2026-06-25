const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The SenderId is required"],ref:'User'},
    chatId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The UserId is required"],ref:'Chat'},
    content:{type:String ,required:[true,"The content is required"]},
    messageType:{type:String,enum:['text','file'],default:'text'},
    fileUrl:{type:String,default:null},
    attachment: {
        fileUrl: { type: String, default: null },
        fileName: { type: String, default: null },
        fileSize: { type: String, default: null } 
    }
},{timestamps:true});
messageSchema.index({ chatId: 1, createdAt: 1 });
module.exports = mongoose.model('Message',messageSchema);
