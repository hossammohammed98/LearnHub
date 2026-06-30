const ApiResponse = require('../../shared/core/ApiResponse');
const BaseController = require('../../shared/core/BaseController');
const catchAsyncHandler = require('../../shared/utils/catchAsyncHandler');
const ChatService = require('./chat.service');
const ApiError = require('../../shared/core/ApiError');
class ChatController extends BaseController {
    constructor() {
        super(BaseController);
    }
    getAllChats = catchAsyncHandler(async (req, res, next) => {
        // console.log(req.user);
        const result = await ChatService.getAllChats(req.user.id);
        return ApiResponse.success(res, "The Chats Returned Successfully", result, 200);
    })
    getChatMessages = catchAsyncHandler(async (req, res, next) => {
        // console.log(req.user);
        // console.log(req.params.id);
        const result = await ChatService.getChatMessages(req.params.id, req.user.id);
        return ApiResponse.success(res, "The Chat Messages Returned Successfully", result, 200);
    })
    getChatAttachmentToken = catchAsyncHandler(async (req, res, next) => {
        const { fileType } = req.body;
        const hasAccess = await ChatService.isUserInChat(req.params.id, req.user.id);
        if (!hasAccess) {
            throw new ApiError(403, "Forbidden: You do not have permission to upload to this chat");
        }
        const result = await ChatService.getChatAttachmentToken(req.params.id, fileType);
        return ApiResponse.success(res, "Signature Created Successfully", result, 200);
    })
    updateChatReadStatus = catchAsyncHandler(async (req, res, next) => {
        const chatId = req.params.id;
        const userId = req.user.id; 

        await ChatService.clearUnreadCount(chatId, userId);

        return ApiResponse.success(res, "Chat read status updated successfully", null, 200);
    });

}
module.exports = new ChatController();
