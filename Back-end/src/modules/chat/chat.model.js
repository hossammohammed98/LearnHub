const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    type:{type:String,enum:['privet','group'],default:'privet'},
    groupName:String,
    lastMessage:{type:mongoose.Schema.Types.ObjectId}
},{timestamps:true});

module.exports = mongoose.model('Chat',chatSchema);