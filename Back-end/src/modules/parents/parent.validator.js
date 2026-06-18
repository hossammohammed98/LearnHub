const zod = require("zod");

const createParent = zod.object({
  UserId: zod.string({ required_error: "The UserId is required" }),
  ChildrenNumber: zod
    .number()
    .int("ChildrenNumber must be an integer")
    .min(0, "ChildrenNumber cannot be negative")
    .default(0)
});

const updateParent = zod.object({
  UserId: zod.string(),
  ChildrenNumber: zod
    .number()
    .int("ChildrenNumber must be an integer")
    .min(0, "ChildrenNumber cannot be negative")
});

exports.validateId = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ"),
});
