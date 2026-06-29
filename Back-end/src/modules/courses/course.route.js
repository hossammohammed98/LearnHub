const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const courseController = require('./course.controller');
const { addCourseSchema, validateId, updateCourseSchema } = require('./course.validator');
router.use(protect);

router.post('/getCourseUploadToken',restrictTo('Teacher','Assistant'),courseController.getCourseUploadToken)

router.route('/')
.get(courseController.getAll)
.post(restrictTo('Teacher','Assistant'),validate(addCourseSchema), courseController.create);

router.route('/:id')
.get(validate(validateId,"params"),courseController.getById)
.patch(restrictTo('Teacher','Assistant'),
    validate(validateId,"params"),
    validate(updateCourseSchema),
    courseController.update)
.delete(restrictTo('Teacher'),validate(validateId,"params"),courseController.delete)

module.exports=router;