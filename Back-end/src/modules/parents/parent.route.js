const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const parentController = require('./parent.controller');
const { addParentSchema, updateParentSchema, validateId } = require('./parent.validator');
router.use(protect);

router.route('/')
.get(parentController.getAll)
.post(restrictTo('Parent','Admin'),validate(addParentSchema), parentController.create);

router.route('/:id')
.get(validate(validateId,"params"),parentController.getById)
.patch(restrictTo('Parent','Admin'),
    validate(validateId,"params"),
    validate(updateParentSchema),
    parentController.update)
.delete(restrictTo('Parent','Admin'),validate(validateId,"params"),parentController.delete)

module.exports=router;