const { z } = require('zod');

exports.addChapterSchema = z.object({
    CourseId: z.string({
        required_error: "معرف الدوره مطلوب" 
    }).regex(/^[0-9a-fA-F]{24}$/, "معرف الدوره غير صحيح"),
    
    Title: z.string({
        required_error: "عنوان الوحده مطلوب" 
    }).min(5, "العنوان لا يقل عن 5 أحرف"),
    
});

exports.updateChapterSchema = z.object({
    Title: z.string().min(5, "العنوان لا يقل عن 5 أحرف").optional(),
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Not Valid Id")
});