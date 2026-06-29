const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const chapterController = require('./chapter.controller');
const { addChapterSchema, validateId, updateChapterSchema } = require('./chapter.validator');
router.use(protect);

router.route('/')
.get(chapterController.getAll)
.post(restrictTo('Teacher','Assistant'),validate(addChapterSchema), chapterController.create);

router.route('/:id')
.get(validate(validateId,"params"),chapterController.getById)
.patch(restrictTo('Teacher','Assistant'),
    validate(validateId,"params"),
    validate(updateChapterSchema),
    chapterController.update)
.delete(restrictTo('Teacher','Assistant'),validate(validateId,"params"),chapterController.delete)

module.exports=router;