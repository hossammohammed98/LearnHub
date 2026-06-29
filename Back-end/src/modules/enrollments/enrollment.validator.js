const { z } = require('zod');

exports.addEnrollmentSchema = z.object({
    StudentId: z.string({
        required_error: "معرف الطالب مطلوب" 
    }).regex(/^[0-9a-fA-F]{24}$/, "معرف الطالب غير صحيح"),
    
    CourseId: z.string({
        required_error: "معرف الدوره مطلوب" 
    }).regex(/^[0-9a-fA-F]{24}$/, "معرف الدوره غير صحيح"),

});

exports.updateEnrollmentSchema = z.object({
    Progress: z.number().min(0, "مستوى التقدم لا يقل عن 0 ").optional(),
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Not Valid Id")
});