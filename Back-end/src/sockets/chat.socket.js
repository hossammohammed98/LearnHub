const chatService = require('../modules/chat/chat.service');

module.exports = (io, socket, redisClient) => {
    // 🎯 FIXED: Destructured to match frontend object payload `{ roomId }`
    socket.on('join_room', async ({ roomId }) => {
        try {
            const chatIdStr = String(roomId);
            const hasAccess = await chatService.isUserInChat(chatIdStr, socket.user.id);
            if (!hasAccess) {
                return socket.emit('error', 'Unauthorized access to this chat');
            }
            socket.join(chatIdStr);
            console.log(`👤 User [${socket.user.id}] joined room channel: ${chatIdStr}`);
        } catch (error) {
            socket.emit('error', 'Failed to Join Chat Room');
        }
    });

    // Send Message
    socket.on('send_message', async (payload) => {
        // 🎯 FIXED: Added clientRefId catch parameter mapping
        const { roomId, messageText, fileUrl, type = 'text', clientRefId } = payload;
        console.log(payload);
        const senderId = socket.user.id;
        const chatIdStr = String(roomId);

        try {
            let savedMessage;
            
            if (type === 'file' && fileUrl) {
                const fileName = messageText.replace('📎 ملف مرفق:', '');
                savedMessage = await chatService.saveUploadedChatAttachment(chatIdStr, senderId, { 
                    secureUrl: fileUrl, 
                    fileName: fileName 
                });
            } else {
                // 🎯 FIXED: Removed the local 'let' keyword to correctly assign the outer variable scope
                savedMessage = await chatService.saveUploadedChatAttachment(chatIdStr, senderId, {
                    secureUrl: null,
                    fileName: messageText,
                    isText: true
                });
            }

            if (!savedMessage || !savedMessage._id) {
                throw new Error("Database failed to return saved document reference data.");
            }

            // Map variables perfectly back to UI interface contracts
            const formattedMessage = {
                id: savedMessage._id.toString(), // Convert ObjectId to clear String representation
                chatId: chatIdStr,
                messageText: messageText,
                type: type,
                fileUrl: fileUrl || null,
                time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                myMessage: false, // Will be computed or fallback managed client-side
                senderId: senderId,
                clientRefId: clientRefId || null // 🎯 FIXED: Forward back up so frontend can dismiss local skeleton bubbles
            };

            // Broadcast message back down onto target connection room strings
            io.to(chatIdStr).emit('message_received', formattedMessage);
        } catch (err) {
            console.error("❌ Socket Database Persistence Error:", err.message);
            socket.emit('error_message', 'تعذر ارسال الرساله');
        }
    });

    // Typing hooks
    socket.on('typing', ({ roomId }) => {
        socket.to(String(roomId)).emit('typing', { chatId: roomId, userId: socket.user.id });
    });

    socket.on('stop_typing', ({ roomId }) => {
        socket.to(String(roomId)).emit('stop_typing', { chatId: roomId, userId: socket.user.id });
    });
};