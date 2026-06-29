const express=require('express');
const router=express.Router();
const chatController=require('../chat/chat.controller')
const {protect}=require('../../middlewares/protect')

router.use(protect);
router.get('/getAllChats',chatController.getAllChats);
router.get('/getChatMessages/:id',chatController.getChatMessages);
router.post('/uploadChatFile/:id',chatController.getChatAttachmentToken);
router.patch('/updateChatReadStatus/:id', chatController.updateChatReadStatus);
// router.post('/saveFileUrl/:id');


module.exports=router;