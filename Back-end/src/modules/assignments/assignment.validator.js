const { z } = require('zod');

const attachmentSchema = z.object({
  url: z.string().url().optional(),
  public_id: z.string().optional(),
  fileName: z.string().optional(),
  resourceType: z.string().optional(),
});

exports.addAssignmentSchema = z.object({
  LessonId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'LessonId is invalid'),
  Title: z.string().min(2, 'Assignment title is required'),
  Content: z.string().min(2, 'Assignment content is required'),
  Attachment: attachmentSchema.optional(),
});

exports.updateAssignmentSchema = z.object({
  Title: z.string().min(2).optional(),
  Content: z.string().min(2).optional(),
  Attachment: attachmentSchema.optional(),
});

exports.validateId = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Not Valid Id'),
});
