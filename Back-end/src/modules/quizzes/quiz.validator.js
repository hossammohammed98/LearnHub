const zod = require('zod');

const createQuiz = zod.object({
    CourseId:zod.string({required_error:"The CourseId is required"}),
    Title:zod.string({required_error:"عنوان الكويز مطلوب"}).min(2, "العنوان لا يقل عن حرفين"),
    Content:zod.string({required_error:"محتوى الكويز مطلوب"}).min(2, "المحتوى لا يقل عن حرفين")
});

const updateQuiz = zod.object({
    CourseId:zod.string(),
    Title:zod.string().min(2, "العنوان لا يقل عن حرفين"),
    Content:zod.string().min(2, "المحتوى لا يقل عن حرفين")
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});
