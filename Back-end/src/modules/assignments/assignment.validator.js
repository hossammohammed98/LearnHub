const { z } = require('zod');

exports.addAssignmentSchema = z.object({
    LessonId: z.string({
        required_error: "معرف الدرس مطلوب" 
    }).regex(/^[0-9a-fA-F]{24}$/, "معرف الدرس غير صحيح"),
    
    Title: z.string({
        required_error: "عنوان الواجب مطلوب" 
    }).min(5, "العنوان لا يقل عن 5 أحرف"),
    
    Content: z.string({
        required_error: "محتوى الواجب مطلوب" 
    }).min(5, "المحتوى لا يقل عن 5 أحرف"),
    Attachment: z.string().url("رابط المرفق غير صحيح").optional()
});

exports.updateAssignmentSchema = z.object({
    Title: z.string().min(5, "العنوان لا يقل عن 5 أحرف").optional(),
    Content: z.string().min(5, "المحتوى لا يقل عن 5 أحرف").optional(),
    Attachment: z.string().url("رابط المرفق غير صحيح").optional()
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Not Valid Id")
});