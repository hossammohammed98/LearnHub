const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    type:{type:String,enum:['private','group'],default:'private'},
    groupName:{type:String,default:null},
    groupAvatar:{type:String,default:null},
    lastMessage:{type:mongoose.Schema.Types.ObjectId,ref:'Message'},
},{timestamps:true});

module.exports = mongoose.model('Chat',chatSchema);