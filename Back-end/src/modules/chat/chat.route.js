const express=require('express');
const router=express.Router();
const chatController=require('../chat/chat.controller')

router.get('/getAllChats',chatController.getAll);
router.get('/getChatMessage/:id',chatController.getById);
router.post('/uploadChatFile/:id',chatController.uploadChatFile);


