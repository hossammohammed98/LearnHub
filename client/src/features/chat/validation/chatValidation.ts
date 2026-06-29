import {z} from 'zod'

export const textMessageSchema=z.string().trim()
.min(1,{ message: 'لا يمكن إرسال رسالة فارغة' })
.max(4000,{ message: 'الرسالة طويلة جداً، الحد الأقصى 4000 حرف' })

const MAX_FILE_SIZE=20*1024*1024;
const ALLOWED_FILE_TYPE=[
    'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

export const fileValidationSchema=z.instanceof(File)
.refine((file)=>file.size<=MAX_FILE_SIZE,{
    message: 'حجم الملف كبير جداً! الحد الأقصى المسموح به هو 20 ميجابايت.',
})
.refine((file)=>ALLOWED_FILE_TYPE.includes(file.type),{
    message: 'نوع الملف غير مدعوم! يسمح فقط بملفات PDF, Word, أو الصور.',
})
