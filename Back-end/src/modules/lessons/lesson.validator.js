const zod = require('zod');

const createLesson = zod.object({
    ChapterId:zod.string({required_error:"The ChapterId is required"}),
    Title:zod.string({required_error:"عنوان الدرس مطلوب"}).min(2, "العنوان لا يقل عن حرفين"),
    Content:zod.string({required_error:"محتوى الدرس مطلوب"}).min(2, "المحتوى لا يقل عن حرفين")
});

const updateLesson = zod.object({
    ChapterId:zod.string(),
    Title:zod.string().min(2, "العنوان لا يقل عن حرفين"),
    Content:zod.string().min(2, "المحتوى لا يقل عن حرفين")
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});
