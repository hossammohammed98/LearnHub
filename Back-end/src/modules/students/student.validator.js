const zod = require('zod');

const createStudent = zod.object({
    UserId:zod.string({required_error:"The UserId is required"}),
    ParentId:zod.string("ParentId should be a string") 
});
const updateStudent = zod.object({
    UserId:zod.string(),
    ParentId:zod.string("ParentId should be a string") 
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});
