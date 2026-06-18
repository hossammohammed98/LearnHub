const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const teacherController = require('./teacher.controller');
const { addTeacherSchema, updateTeacherSchema, validateId } = require('./teacher.validator');
router.use(protect);

router.route('/')
.get(teacherController.getAll)
.post(restrictTo('Teacher','Admin'),validate(addTeacherSchema), teacherController.create);

router.route('/:id')
.get(validate(validateId,"params"),teacherController.getById)
.patch(restrictTo('Teacher','Admin'),
    validate(validateId,"params"),
    validate(updateTeacherSchema),
    teacherController.update)
.delete(restrictTo('Teacher','Admin'),validate(validateId,"params"),teacherController.delete)

module.exports=router;