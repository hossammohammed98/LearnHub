const { z } = require('zod');

exports.addCourseSchema = z.object({
    TeacherId: z.string({
        required_error: "معرف المعلم مطلوب" 
    }).regex(/^[0-9a-fA-F]{24}$/, "معرف المعلم غير صحيح"),
    
    Title: z.string({
        required_error: "عنوان الدوره مطلوب" 
    }).min(5, "العنوان لا يقل عن 5 أحرف"),
    
    Description: z.string({
        required_error: "وصف الدوره مطلوب" 
    }).min(15, "الوصف لا يقل عن 15 حرف"),
});

exports.updateCourseSchema = z.object({
    Title: z.string().min(5, "العنوان لا يقل عن 5 أحرف").optional(),
    Description: z.string().min(5, "الوصف لا يقل عن 15 حرف").optional(),
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Not Valid Id")
});