const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const courseController = require('./course.controller');
const { addCourseSchema, validateId, updateCourseSchema, courseDraftSchema, uploadTokenSchema } = require('./course.validator');
router.use(protect);

router.post('/getCourseUploadToken',restrictTo('Teacher','Assistant'),validate(uploadTokenSchema),courseController.getCourseUploadToken)
router.post('/save-draft',restrictTo('Teacher','Assistant'),validate(courseDraftSchema),courseController.saveDraft)
router.post('/publish',restrictTo('Teacher','Assistant'),validate(courseDraftSchema),courseController.publish)

router.route('/')
.get(courseController.getAll)
.post(restrictTo('Teacher','Assistant'),validate(addCourseSchema), courseController.create);

router.get('/my-courses', restrictTo('Student'), courseController.getMyCourses);
router.get('/dashboard-summary', restrictTo('Student'), courseController.getDashboardSummary);

router.route('/:id')
.get(validate(validateId,"params"),courseController.getById)
.patch(restrictTo('Teacher','Assistant'),
    validate(validateId,"params"),
    validate(updateCourseSchema),
    courseController.update)
.delete(restrictTo('Teacher'),validate(validateId,"params"),courseController.delete)

module.exports=router;
