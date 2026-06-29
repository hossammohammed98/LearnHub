const express=require('express');
const router=express.Router();
const chatController=require('../chat/chat.controller')

router.get('/getAllChats',chatController.getAllChats);
router.get('/getChatMessages/:id',chatController.getChatMessages);
router.post('/uploadChatFile/:id',chatController.getChatAttachmentToken);
router.post('/saveFileUrl/:id');


