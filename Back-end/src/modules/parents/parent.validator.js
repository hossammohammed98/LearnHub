const z = require("zod");
const validator = require("validator");

const createParent = z.object({
  UserId: z.string({ required_error: "The UserId is required" }),
  ChildrenNumber: z
    .number()
    .int("ChildrenNumber must be an integer")
    .min(0, "ChildrenNumber cannot be negative")
    .default(0),
});

const updateParent = z.object({
  UserId: z.string().optional(),
  ChildrenNumber: z
    .number()
    .int("ChildrenNumber must be an integer")
    .min(0, "ChildrenNumber cannot be negative")
    .optional(),
});

const addChildSchema = z
  .object({
    FName: z.string({ required_error: "الاسم الأول مطلوب" }).min(2, "الاسم الأول لا يقل عن حرفين"),
    LName: z.string({ required_error: "الاسم الأخير مطلوب" }).min(2, "الاسم الأخير لا يقل عن حرفين"),
    Email: z.string({ required_error: "البريد الإلكتروني مطلوب" }).email("البريد الإلكتروني غير صالح"),
    Phone: z.string({ required_error: "رقم الهاتف مطلوب" }).refine(
      (value) => validator.isMobilePhone(value, "any", { strictMode: false }),
      { message: "رقم الهاتف غير صحيح" }
    ),
    SSN: z.string({ required_error: "الرقم القومي مطلوب" }).min(14, "الرقم القومي المصري يجب أن يتكون من 14 رقماً").max(14, "الرقم القومي المصري يجب أن يتكون من 14 رقماً"),
    Password: z.string({ required_error: "الرقم السرى مطلوب" }).min(6, "الرقم السرى لا يقل عن 6 أحرف"),
    ConfirmPassword: z.string({ required_error: "تأكيد الرقم السرى مطلوب" }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "الرقم السرى غير متطابق مع تأكيد الرقم السرى",
    path: ["ConfirmPassword"],
  });

exports.addParentSchema = createParent;
exports.updateParentSchema = updateParent;
exports.addChildSchema = addChildSchema;
exports.validateId = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ"),
});
