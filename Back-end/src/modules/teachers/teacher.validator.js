const z = require('zod');

const createTeacher = z.object({
    UserId:z.string({required_error:"The UserId is required"})
});

const updateTeacher = z.object({
    UserId:z.string()
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});
