const zod = require('zod');

const createTeacher = zod.object({
    UserId:zod.string({required_error:"The UserId is required"})
});

const updateTeacher = zod.object({
    UserId:zod.string()
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});
