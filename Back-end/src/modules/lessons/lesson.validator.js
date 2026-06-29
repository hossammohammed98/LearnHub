const z = require('zod');

const createLesson = z.object({
    ChapterId:z.string({required_error:"The ChapterId is required"}),
    Title:z.string({required_error:"عنوان الدرس مطلوب"}).min(2, "العنوان لا يقل عن حرفين"),
    Content:z.string({required_error:"محتوى الدرس مطلوب"}).min(2, "المحتوى لا يقل عن حرفين")
});

const updateLesson = z.object({
    ChapterId:z.string(),
    Title:z.string().min(2, "العنوان لا يقل عن حرفين"),
    Content:z.string().min(2, "المحتوى لا يقل عن حرفين")
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});
