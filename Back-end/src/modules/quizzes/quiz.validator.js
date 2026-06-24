const z = require('zod');

const createQuiz = z.object({
    CourseId:z.string({required_error:"The CourseId is required"}),
    Title:z.string({required_error:"عنوان الكويز مطلوب"}).min(2, "العنوان لا يقل عن حرفين"),
    Content:z.string({required_error:"محتوى الكويز مطلوب"}).min(2, "المحتوى لا يقل عن حرفين")
});

const updateQuiz = z.object({
    CourseId:z.string(),
    Title:z.string().min(2, "العنوان لا يقل عن حرفين"),
    Content:z.string().min(2, "المحتوى لا يقل عن حرفين")
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});
