const chatService=require('../modules/chat/chat.service');
module.exports=(io,socket,redisClient)=>{
    //join Room
    socket.on('join_room',async (chatId)=>{
        try{
        const hasAccess=await chatService.isUserInChat(String(chatId),socket.user.id);
        if(!hasAccess)
            return socket.emit('error','Unauthorized access to this chat')
        socket.join(String(chatId));
        }
        catch(error){
            socket.emit('error','Failed to Join Chat Room')
        }
    })
    //send Message
    socket.on('send_message',async (payload)=>{
        const {roomId,messageText,fileUrl,type='text'}=payload;
        const senderId=socket.user.id;
        try{
            let savedMessage;
            if(type ==='file'&&fileUrl)
            {
                const fileName=messageText.replace('📎 ملف مرفق:','');
                 savedMessage=await chatService.saveUploadedChatAttachment(roomId,senderId,{secureUrl:fileUrl,fileName:fileName});
            }
            else{
                let savedMessage=await chatService.saveUploadedChatAttachment(roomId,senderId,{
                    secureUrl:null,
                    fileName:messageText,
                    isText:true
                })
            }
            const formattedMessage={
                id:savedMessage._id,
                chatId:roomId,
                messageText:messageText,
                type:type,
                fileUrl:fileUrl||null,
                timestamp:new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                myMessage:false,
                senderId:senderId,
            }
            io.to(String(roomId)).emit('message_received',formattedMessage);
        }
        catch(err){
            socket.emit('error_message','تعذر ارسال الرساله');
        }

    })
    //typing
    socket.on('typing',(chatId)=>{
        socket.to(String(chatId)).emit('typing',{
            chatId:chatId,
            userId:socket.user.id
        });
    })
    //stop typing
    socket.on('stop_typing',(chatId)=>{
        socket.to(String(chatId)).emit('stop_typing',{
            chatId:chatId,
            userId:socket.user.id
        });
    })
}