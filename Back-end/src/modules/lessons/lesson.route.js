const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const lessonController = require('./lesson.controller');
const { addLessonSchema, validateId, updateLessonSchema } = require('./lesson.validator');
router.use(protect);

router.route('/')
.get(lessonController.getAll)
.post(restrictTo('Teacher','Assistant'),validate(addLessonSchema), lessonController.create);

router.route('/:id')
.get(validate(validateId,"params"),lessonController.getById)
.patch(restrictTo('Teacher','Assistant'),
    validate(validateId,"params"),
    validate(updateLessonSchema),
    lessonController.update)
.delete(restrictTo('Teacher','Assistant'),validate(validateId,"params"),lessonController.delete)

module.exports=router;