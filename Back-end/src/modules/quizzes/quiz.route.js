const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const quizController = require('./quiz.controller');
const { addQuizSchema, validateId, updateQuizSchema } = require('./quiz.validator');
router.use(protect);

router.route('/')
.get(quizController.getAll)
.post(restrictTo('Teacher','Assistant'),validate(addQuizSchema), quizController.create);

router.route('/:id')
.get(validate(validateId,"params"),quizController.getById)
.patch(restrictTo('Teacher','Assistant'),
    validate(validateId,"params"),
    validate(updateQuizSchema),
    quizController.update)
.delete(restrictTo('Teacher','Assistant'),validate(validateId,"params"),quizController.delete)

module.exports=router;