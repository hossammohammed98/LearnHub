const { z } = require('zod');
const validator = require('validator');

const egyptSSNRegex = /^[0-9]{14}$/;

exports.registerUserSchema = z.object({
    FName: z.string({
        required_error: "الاسم الأول مطلوب"
    }).min(2, "الاسم الأول لا يقل عن حرفين"),
    LName: z.string({
        required_error: "الاسم الأخير مطلوب"
    }).min(2, "الاسم الأخير لا يقل عن حرفين"),
    Email: z.string({
        required_error: "الأيميل مطلوب",
    }).email("الأيميل خطأ"),
    
    SSN: z.string({
        required_error: "الرقم القومي مطلوب"
    }).regex(egyptSSNRegex, "الرقم القومي المصري يجب أن يتكون من 14 رقماً فقط دون حروف"),
    
    Password: z.string({
        required_error: "الرقم السرى مطلوب",
    }).min(6, "الرقم السرى لا يقل عن 6 أحرف"),
    ConfirmPassword: z.string({
        required_error: "تأكيد الرقم السرى مطلوب"
    }),
    
    Phone: z.string({
        required_error: "رقم الهاتف مطلوب"
    }).refine(
        (value) => validator.isMobilePhone(value, 'any', { strictMode: false }), 
        { message: "رقم الهاتف غير صحيح، يرجى كتابة الرقم متبوعاً بكود الدولة (مثال: +9665... أو +201...)" }
    ),
    
    Role: z.enum(['Admin', 'Student', 'Teacher', 'Parent'], {
        required_error: "يرجى اختيار المسمى الذى ستسجل به"
    }).default('Student'),    
})
.refine((data) => data.Password === data.ConfirmPassword, {
    message: "الرقم السرى غير متطابق مع تأكيد الرقم السرى",
    path: ["ConfirmPassword"]
});

exports.updateUserSchema = z.object({
    FName: z.string().min(2, "الاسم الأول لا يقل عن حرفين").optional(),
    LName: z.string().min(2, "الاسم الأخير لا يقل عن حرفين").optional(),
    Email: z.string().email("الأيميل خطأ").optional(),
    SSN: z.string().regex(egyptSSNRegex, "الرقم القومي المصري يجب أن يتكون من 14 رقماً").optional(),
    Password: z.string().min(6, "الرقم السرى لا يقل عن 6 أحرف").optional(),
    Phone: z.string().refine(
        (value) => validator.isMobilePhone(value, 'any', { strictMode: false }), 
        { message: "رقم الهاتف غير صحيح" }
    ).optional(),
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});

exports.getUserByEmail = z.object({
    email: z.string().email("الايميل خطأ").optional()
});