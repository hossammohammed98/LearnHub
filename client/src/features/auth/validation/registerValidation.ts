import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "الاسم الأول قصير جداً"),
  lastName: z.string().min(2, "الاسم الأخير قصير جداً"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  ssn: z.string().length(14, "الرقم القومي يجب أن يكون 14 رقماً"),
  phone: z.string().regex(/^01[0125]\d{8}$/, "رقم الهاتف غير صحيح"), 
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  confirmPassword:z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  role: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"], 
  });
export type RegisterFormValues = z.infer<typeof registerSchema>;