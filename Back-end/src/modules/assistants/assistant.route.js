const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const assistantController = require('./assistant.controller');
const { addAssistantSchema, updateAssistantSchema, validateId } = require('./assistant.validator');
router.use(protect);

router.route('/')
.get(assistantController.getAll)
.post(restrictTo('Teacher'),validate(addAssistantSchema), assistantController.create);

router.route('/:id')
.get(validate(validateId,"params"),assistantController.getById)
.patch(restrictTo('Teacher'),
    validate(validateId,"params"),
    validate(updateAssistantSchema),
    assistantController.update)
.delete(restrictTo('Teacher'),validate(validateId,"params"),assistantController.delete)

module.exports=router;