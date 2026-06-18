const express=require('express');
const router=express.Router();
const assignmentController = require('./assignment.controller');
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const { addAssignmentSchema, validateId, updateAssignmentSchema } = require('./assignment.validator');
router.use(protect);

router.route('/')
.get(assignmentController.getAll)
.post(restrictTo('Teacher','Assistant'),validate(addAssignmentSchema), assignmentController.create);

router.route('/:id')
.get(validate(validateId,"params"),assignmentController.getById)
.patch(restrictTo('Teacher','Assistant'),
    validate(validateId,"params"),
    validate(updateAssignmentSchema),
    assignmentController.update)
.delete(restrictTo('Teacher','Assistant'),validate(validateId,"params"),assignmentController.delete)

module.exports=router;