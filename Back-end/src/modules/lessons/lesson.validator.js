const { z } = require('zod');

const mediaSchema = z.object({
  url: z.string().url().optional(),
  public_id: z.string().optional(),
  resourceType: z.string().optional(),
  fileName: z.string().optional(),
});

exports.addLessonSchema = z.object({
  ChapterId: z.string({ required_error: 'The ChapterId is required' }),
  Title: z.string({ required_error: 'Lesson title is required' }).min(2),
  Content: z.string().optional(),
  Video: mediaSchema.optional(),
  Attachments: z.array(mediaSchema).optional(),
});

exports.updateLessonSchema = z.object({
  ChapterId: z.string().optional(),
  Title: z.string().min(2).optional(),
  Content: z.string().min(2).optional(),
  Video: mediaSchema.optional(),
  Attachments: z.array(mediaSchema).optional(),
});

exports.validateId = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Not Valid Id'),
});
