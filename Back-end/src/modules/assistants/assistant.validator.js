const { z } = require('zod');

exports.addAssistantSchema = z.object({
    TeacherId: z.string({
        required_error: "معرف المساعد مطلوب" 
    }).regex(/^[0-9a-fA-F]{24}$/, "معرف المساعد غير صحيح"),

    Email: z.string({
        required_error: "الأيميل مطلوب",
    }).email("الأيميل خطأ"),

    Password: z.string({
        required_error: "الرقم السرى مطلوب",
    }).min(6, "الرقم السرى لا يقل عن 6 أحرف"),
});

exports.updateAssistantSchema = z.object({
    Email: z.string().email("الأيميل خطأ").optional(),
    Password: z.string().min(6, "الرقم السرى لا يقل عن 6 أحرف").optional(),
});
exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Not Valid Id")
});