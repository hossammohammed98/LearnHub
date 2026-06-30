const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/protect");
const { restrictTo } = require("../../middlewares/restrictTo");
const { validate } = require("../../middlewares/validate");
const parentController = require("./parent.controller");
const {
  addParentSchema,
  updateParentSchema,
  addChildSchema,
  validateId,
} = require("./parent.validator");

router.use(protect);

router.get("/me", restrictTo("Parent", "Admin"), parentController.getParentOverview);

router
  .route("/children")
  .get(restrictTo("Parent", "Admin"), parentController.getChildren)
  .post(restrictTo("Parent", "Admin"), validate(addChildSchema), parentController.createChild);

router
  .route("/")
  .get(parentController.getAll)
  .post(restrictTo("Parent", "Admin"), validate(addParentSchema), parentController.create);

router
  .route("/:id")
  .get(validate(validateId, "params"), parentController.getById)
  .patch(
    restrictTo("Parent", "Admin"),
    validate(validateId, "params"),
    validate(updateParentSchema),
    parentController.update
  )
  .delete(
    restrictTo("Parent", "Admin"),
    validate(validateId, "params"),
    parentController.delete
  );

module.exports = router;