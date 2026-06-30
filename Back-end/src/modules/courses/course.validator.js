const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Not Valid Id');
const optionalObjectId = objectId.optional();

const assetSchema = z.object({
  url: z.string().url().optional(),
  public_id: z.string().optional(),
  fileName: z.string().optional(),
  resourceType: z.string().optional(),
}).optional();

const assignmentDraftSchema = z.object({
  id: optionalObjectId,
  clientId: z.string().optional(),
  Title: z.string().min(2, 'Assignment title is required'),
  Content: z.string().min(2, 'Assignment content is required'),
  Attachment: assetSchema,
});

const lessonDraftSchema = z.object({
  id: optionalObjectId,
  clientId: z.string().optional(),
  Title: z.string().min(2, 'Lesson title is required'),
  Content: z.string().optional(),
  Video: assetSchema,
  Attachments: z.array(assetSchema.unwrap()).optional(),
  assignments: z.array(assignmentDraftSchema).optional(),
});

const unitDraftSchema = z.object({
  id: optionalObjectId,
  clientId: z.string().optional(),
  Title: z.string().min(2, 'Unit title is required'),
  lessons: z.array(lessonDraftSchema).optional(),
});

exports.addCourseSchema = z.object({
  TeacherId: objectId,
  Title: z.string().min(2, 'Course title is required'),
  Description: z.string().min(2, 'Course description is required'),
  Price: z.coerce.number().min(0).optional(),
  CoverImage: z.string().url().optional(),
  CoverImagePublicId: z.string().optional(),
  PromoUrl: z.string().url().optional().or(z.literal('')),
});

exports.updateCourseSchema = z.object({
  Title: z.string().min(2).optional(),
  Description: z.string().min(2).optional(),
  Price: z.coerce.number().min(0).optional(),
  CoverImage: z.string().url().optional(),
  CoverImagePublicId: z.string().optional(),
  PromoUrl: z.string().url().optional().or(z.literal('')),
  Status: z.enum(['draft', 'published']).optional(),
});

exports.courseDraftSchema = z.object({
  courseId: optionalObjectId,
  TeacherId: optionalObjectId,
  Title: z.string().min(2, 'Course title is required'),
  Description: z.string().min(2, 'Course description is required'),
  Price: z.coerce.number().min(0).optional(),
  CoverImage: z.string().url().optional(),
  CoverImagePublicId: z.string().optional(),
  PromoUrl: z.string().url().optional().or(z.literal('')),
  units: z.array(unitDraftSchema).optional(),
});

exports.uploadTokenSchema = z.object({
  courseId: z.string().min(1),
  chapterId: z.string().min(1),
  lessonId: z.string().min(1).optional(),
  fileType: z.string().min(1).optional(),
  assetType: z.enum(['cover', 'video', 'attachment', 'assignment']).optional(),
});

exports.validateId = z.object({
  id: objectId,
});
