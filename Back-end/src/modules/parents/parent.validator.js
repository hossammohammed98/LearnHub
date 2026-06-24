const z = require("zod");

const createParent = z.object({
  UserId: z.string({ required_error: "The UserId is required" }),
  ChildrenNumber: z
    .number()
    .int("ChildrenNumber must be an integer")
    .min(0, "ChildrenNumber cannot be negative")
    .default(0)
});

const updateParent = z.object({
  UserId: z.string(),
  ChildrenNumber: z
    .number()
    .int("ChildrenNumber must be an integer")
    .min(0, "ChildrenNumber cannot be negative")
});

exports.validateId = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ"),
});
