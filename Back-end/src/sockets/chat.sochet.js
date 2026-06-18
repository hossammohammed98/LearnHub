const chatService=require('../modules/chat/chat.service');
module.exports=(io,socket,redisClient)=>{
    socket.on('join_chat',async (chatId)=>{
        try{
        const hasAccess=await chatService.isH(String(chatId),socket.user.id);
        if(!hasAccess)
            return socket.emit('error','Unauthorized access to this chat')
        socket.join(String(chatId));
        }
        catch(error){
            socket.emit('error','Failed to Join Chat Room')
        }
    })
    socket.on('typing',(chatId)=>{
        socket.to(String(chatId)).emit('typing',{
            chatId:chatId,
            userId:socket.user.id
        });
    })
    socket.on('stop_typing',(chatId)=>{
        socket.to(String(chatId)).emit('stop_typing',{
            chatId:chatId,
            userId:socket.user.id
        });
    })
}