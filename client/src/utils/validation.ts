// import * as z from 'zod';

// export const loginSchema = z.object({
//   Email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('صيغة البريد الإلكتروني غير صحيحة'),
//   Password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 أحرف'),
// });

// export const registerSchema = z.object({
//   FName: z.string().min(2, 'الاسم الأول مطلوب (حرفين على الأقل)'),
//   LName: z.string().min(2, 'الاسم الأخير مطلوب (حرفين على الأقل)'),
//   Email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('بريد إلكتروني غير صالح'),
//   SSN: z.string().length(14, 'الرقم القومي المصري يجب أن يكون 14 رقماً').regex(/^\d+$/, 'يجب أن يحتوي على أرقام فقط'),
//   Password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل وبها رمز ورقم عالي الأمان'),
//   Phone: z.string().min(11, 'رقم الهاتف غير صحيح').max(11, 'رقم الهاتف غير صحيح').regex(/^01[0125]\d{8}$/, 'يجب أن يكون رقم هاتف مصري صحيح'),
//   Role: z.enum(['Student', 'Teacher', 'Parent', 'Assistant'], {
//     errorMap: () => ({ message: 'الرجاء اختيار صلاحية مستخدم صحيحة' }),
//   }),
//   Avatar: z.string().url().optional().or(z.literal('')),
// });

// export type LoginInput = z.infer<typeof loginSchema>;
// export type RegisterInput = z.infer<typeof registerSchema>;