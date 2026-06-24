const z = require('zod');

const createStudent = z.object({
    UserId:z.string({required_error:"The UserId is required"}),
    ParentId:z.string("ParentId should be a string") 
});
const updateStudent = z.object({
    UserId:z.string(),
    ParentId:z.string("ParentId should be a string") 
});

exports.validateId = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "معرف المستخدم خطأ")
});
