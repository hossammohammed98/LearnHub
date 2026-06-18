const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const studentController = require('./student.controller');
const { addStudentSchema, updateStudentSchema, validateId } = require('./student.validator');
router.use(protect);

router.route('/')
.get(studentController.getAll)
.post(restrictTo('Student','Admin'),validate(addStudentSchema), studentController.create);

router.route('/:id')
.get(validate(validateId,"params"),studentController.getById)
.patch(restrictTo('Student','Admin'),
    validate(validateId,"params"),
    validate(updateStudentSchema),
    studentController.update)
.delete(restrictTo('Student','Admin'),validate(validateId,"params"),studentController.delete)

module.exports=router;