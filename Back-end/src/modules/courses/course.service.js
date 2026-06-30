const Quiz = require('../quizzes/quiz.model');
const CourseRepository = require("./course.repository");
const BaseService = require("../../shared/core/BaseService");
const { cloudinary, generateSignature } = require("../../config/cloudinary");
const ApiError = require("../../shared/core/ApiError");
const Course = require("./course.model");
const Chapter = require("../chapters/chapter.model");
const Lesson = require("../lessons/lesson.model");
const Assignment = require("../assignments/assignment.model");
const Teacher = require("../teachers/teacher.model");
const User = require("../users/user.model");

class CourseService extends BaseService {
  constructor() {
    super(CourseRepository);
  }

  async resolveTeacherId(user, explicitTeacherId) {
    if (user.role === 'Teacher') {
      const teacher = await Teacher.findOneAndUpdate(
        { UserId: user.id },
        { UserId: user.id },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return teacher._id;
    }

    if (explicitTeacherId) return explicitTeacherId;

    throw new ApiError(400, 'يجب تحديد ملف المعلم قبل حفظ الدورة');
  }

  async assertCanManageCourse(user, courseId, explicitTeacherId) {
    if (!courseId) return this.resolveTeacherId(user, explicitTeacherId);

    const course = await Course.findById(courseId);
    if (!course) throw new ApiError(404, 'Course not found');

    if (user.role === 'Teacher') {
      const teacherId = await this.resolveTeacherId(user, explicitTeacherId);
      if (course.TeacherId.toString() !== teacherId.toString()) {
        throw new ApiError(403, 'لا يمكنك تعديل دورة لا تملكها');
      }
    }

    return course.TeacherId;
  }

  async getCourseUploadToken(user, { courseId, chapterId, lessonId, fileType, assetType }) {
    await this.assertCanManageCourse(user, courseId);

    const lowerFileType = fileType?.toLowerCase();
    const folderParts = [`tallem/courses/course_${courseId}`];
    if (assetType === 'cover') {
      folderParts.push('cover');
    } else {
      folderParts.push(`chapters/chapter_${chapterId}`);
      if (lessonId) folderParts.push(`lessons/lesson_${lessonId}`);
    }

    let resourceType = assetType === 'video' ? 'video' : 'raw';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(lowerFileType)) {
      resourceType = 'image';
    } else if (['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(lowerFileType)) {
      resourceType = 'video';
    } else if (['pdf', 'doc', 'docx', 'xlsx', 'txt', 'zip', 'ppt', 'pptx'].includes(lowerFileType)) {
      resourceType = 'raw';
    }

    const signatureOptions = {
      folder: folderParts.join('/'),
    };

    const signatureData = generateSignature(signatureOptions);

    return {
      ...signatureData,
      folder: signatureOptions.folder,
      resourceType,
    };
  }

  async getCourseDetails(user, courseId) {
    const course = await Course.findById(courseId).lean();
    if (!course) throw new ApiError(404, 'Course not found');

    if (user.role === 'Student') {
      const student = await User.findById(user.id).lean();
      const isEnrolled = (student?.enrolledCourses || []).some(
        (courseRef) => courseRef.toString() === courseId.toString()
      );

      if (!isEnrolled) {
        throw new ApiError(403, 'You are not enrolled in this course');
      }
    } else {
      await this.assertCanManageCourse(user, courseId);
    }

    const chapters = await Chapter.find({ CourseId: courseId }).sort({ createdAt: 1 }).lean();
    const chapterIds = chapters.map((chapter) => chapter._id);
    const lessons = chapterIds.length
      ? await Lesson.find({ ChapterId: { $in: chapterIds } }).sort({ createdAt: 1 }).lean()
      : [];
    const lessonIds = lessons.map((lesson) => lesson._id);
    const assignments = lessonIds.length
      ? await Assignment.find({ LessonId: { $in: lessonIds } }).sort({ createdAt: 1 }).lean()
      : [];

    const assignmentsByLesson = assignments.reduce((accumulator, assignment) => {
      const lessonId = assignment.LessonId.toString();
      accumulator[lessonId] = accumulator[lessonId] || [];
      accumulator[lessonId].push(assignment);
      return accumulator;
    }, {});

    const lessonsByChapter = lessons.reduce((accumulator, lesson) => {
      const chapterId = lesson.ChapterId.toString();
      accumulator[chapterId] = accumulator[chapterId] || [];
      accumulator[chapterId].push({
        ...lesson,
        assignments: assignmentsByLesson[lesson._id.toString()] || [],
      });
      return accumulator;
    }, {});

    const units = chapters.map((chapter) => ({
      ...chapter,
      lessons: lessonsByChapter[chapter._id.toString()] || [],
    }));

    return { course, units };
  }

  async getMyCourses(user) {
    if (user.role !== 'Student') {
      throw new ApiError(403, 'Only students can view enrolled courses');
    }

    const student = await User.findById(user.id)
      .populate({
        path: 'enrolledCourses',
        populate: { path: 'TeacherId' },
      })
      .lean();

    if (!student) throw new ApiError(404, 'Student not found');
    return student.enrolledCourses || [];
  }

  async getStudentDashboardSummary(user) {
    if (user.role !== 'Student') {
      throw new ApiError(403, 'Only students can access dashboard summary');
    }

    const student = await User.findById(user.id)
      .populate({
        path: 'enrolledCourses',
        populate: { path: 'TeacherId' },
      })
      .lean();

    if (!student) throw new ApiError(404, 'Student not found');

    const enrolledCourses = (student.enrolledCourses || []).filter(Boolean);
    const courseIds = enrolledCourses.map((course) => course._id);

    const chapters = courseIds.length
      ? await Chapter.find({ CourseId: { $in: courseIds } }).lean()
      : [];
    const chapterIds = chapters.map((chapter) => chapter._id);

    const lessons = chapterIds.length
      ? await Lesson.find({ ChapterId: { $in: chapterIds } }).lean()
      : [];
    const lessonIds = lessons.map((lesson) => lesson._id);

    const quizCount = courseIds.length
      ? await Quiz.countDocuments({ CourseId: { $in: courseIds } })
      : 0;

    const assignmentCount = lessonIds.length
      ? await Assignment.countDocuments({ LessonId: { $in: lessonIds } })
      : 0;

    const pendingQuizzes = quizCount + assignmentCount;
    const totalLessons = lessons.length;
    const completedLessons = 0;
    const overallProgress = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newCoursesCount = enrolledCourses.filter(
      (course) => course.createdAt && new Date(course.createdAt) > thirtyDaysAgo
    ).length;

    let currentCourse = null;
    if (enrolledCourses.length > 0) {
      const active = enrolledCourses[0];
      const courseChapterIds = chapters
        .filter((chapter) => chapter.CourseId.toString() === active._id.toString())
        .map((chapter) => chapter._id.toString());
      const courseLessons = lessons.filter((lesson) =>
        courseChapterIds.includes(lesson.ChapterId.toString())
      );
      const courseProgress = courseLessons.length > 0
        ? Math.round((completedLessons / courseLessons.length) * 100)
        : 0;

      currentCourse = {
        id: active._id.toString(),
        name: active.Title,
        title: 'الدورة الحالية',
        description: active.Description || '',
        progress: courseProgress,
        level: 'المستوى العام',
        status: courseProgress >= 100 ? 'مكتمل' : 'قيد التقدم',
        coverImage: active.CoverImage || '/images/login.jpg',
      };
    }

    return {
      profile: {
        avatar: student.Avatar || null,
        firstName: student.FName,
        lastName: student.LName,
        roleLabel: 'طالب العلم',
      },
      stats: {
        totalCourses: enrolledCourses.length,
        newCoursesCount,
        completedLessons,
        overallProgress,
        pendingQuizzes,
        isQuizzesUrgent: pendingQuizzes >= 3,
      },
      currentCourse,
      upcomingSessions: [],
    };
  }

  async updateCourseMeta(user, courseId, payload) {
    await this.assertCanManageCourse(user, courseId, payload.TeacherId);

    const updateData = {
      Title: payload.Title,
      Description: payload.Description,
      Price: payload.Price,
      CoverImage: payload.CoverImage,
      CoverImagePublicId: payload.CoverImagePublicId,
      PromoUrl: payload.PromoUrl,
      Status: payload.Status,
      PublishedAt: payload.Status === 'published' ? new Date() : undefined,
    };

    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

    const course = await Course.findByIdAndUpdate(courseId, updateData, { new: true, runValidators: true });
    if (!course) throw new ApiError(404, 'Course not found');
    return course;
  }

  async deleteCourseWorkflow(user, courseId) {
    await this.assertCanManageCourse(user, courseId);

    const chapters = await Chapter.find({ CourseId: courseId }).lean();
    const chapterIds = chapters.map((chapter) => chapter._id);
    const lessons = chapterIds.length ? await Lesson.find({ ChapterId: { $in: chapterIds } }).lean() : [];
    const lessonIds = lessons.map((lesson) => lesson._id);
    const assignments = lessonIds.length ? await Assignment.find({ LessonId: { $in: lessonIds } }).lean() : [];
    const cloudinaryCleanupErrors = [];

    const destroyAsset = async (asset, fallbackResourceType = 'raw') => {
      if (!asset?.public_id) return;
      try {
        await cloudinary.uploader.destroy(asset.public_id, {
          resource_type: asset.resourceType || fallbackResourceType,
        });
      } catch (error) {
        cloudinaryCleanupErrors.push({
          public_id: asset.public_id,
          message: error.message,
        });
      }
    };

    const course = await Course.findById(courseId).lean();
    await destroyAsset({ public_id: course?.CoverImagePublicId, resourceType: 'image' }, 'image');

    for (const lesson of lessons) {
      await destroyAsset(lesson.Video, 'video');
      for (const attachment of lesson.Attachments || []) {
        await destroyAsset(attachment, 'raw');
      }
    }

    for (const assignment of assignments) {
      await destroyAsset(assignment.Attachment, 'raw');
    }

    if (lessonIds.length) await Assignment.deleteMany({ LessonId: { $in: lessonIds } });
    if (chapterIds.length) await Lesson.deleteMany({ ChapterId: { $in: chapterIds } });
    await Chapter.deleteMany({ CourseId: courseId });
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) throw new ApiError(404, 'Course not found');

    return {
      courseId,
      deletedUnits: chapterIds.length,
      deletedLessons: lessonIds.length,
      deletedAssignments: assignments.length,
      cloudinaryCleanupErrors,
    };
  }

  async saveCourseWorkflow(user, payload, status = 'draft') {
    const teacherId = await this.assertCanManageCourse(user, payload.courseId, payload.TeacherId);
    const courseData = {
      TeacherId: teacherId,
      Title: payload.Title,
      Description: payload.Description,
      Price: payload.Price,
      CoverImage: payload.CoverImage,
      CoverImagePublicId: payload.CoverImagePublicId,
      PromoUrl: payload.PromoUrl,
      Status: status,
      PublishedAt: status === 'published' ? new Date() : undefined,
    };

    Object.keys(courseData).forEach((key) => courseData[key] === undefined && delete courseData[key]);

    const course = payload.courseId
      ? await Course.findByIdAndUpdate(payload.courseId, courseData, { new: true, runValidators: true })
      : await Course.create(courseData);

    if (!course) throw new ApiError(404, 'Course not found');

    const unitIdMap = {};
    const lessonIdMap = {};
    const assignmentIdMap = {};
    const units = [];

    for (const unitInput of payload.units || []) {
      const unitPayload = {
        CourseId: course._id,
        Title: unitInput.Title,
      };
      const unit = unitInput.id
        ? await Chapter.findByIdAndUpdate(unitInput.id, unitPayload, { new: true, runValidators: true })
        : await Chapter.create(unitPayload);

      if (!unit) continue;
      if (unitInput.clientId) unitIdMap[unitInput.clientId] = unit._id;

      const lessons = [];
      for (const lessonInput of unitInput.lessons || []) {
        const lessonPayload = {
          ChapterId: unit._id,
          Title: lessonInput.Title,
          Content: lessonInput.Content,
          Video: lessonInput.Video,
          Attachments: lessonInput.Attachments || [],
        };
        Object.keys(lessonPayload).forEach((key) => lessonPayload[key] === undefined && delete lessonPayload[key]);

        const lesson = lessonInput.id
          ? await Lesson.findByIdAndUpdate(lessonInput.id, lessonPayload, { new: true, runValidators: true })
          : await Lesson.create(lessonPayload);

        if (!lesson) continue;
        if (lessonInput.clientId) lessonIdMap[lessonInput.clientId] = lesson._id;

        const assignments = [];
        for (const assignmentInput of lessonInput.assignments || []) {
          const assignmentPayload = {
            LessonId: lesson._id,
            Title: assignmentInput.Title,
            Content: assignmentInput.Content,
            Attachment: assignmentInput.Attachment,
          };
          Object.keys(assignmentPayload).forEach((key) => assignmentPayload[key] === undefined && delete assignmentPayload[key]);

          const assignment = assignmentInput.id
            ? await Assignment.findByIdAndUpdate(assignmentInput.id, assignmentPayload, { new: true, runValidators: true })
            : await Assignment.create(assignmentPayload);

          if (!assignment) continue;
          if (assignmentInput.clientId) assignmentIdMap[assignmentInput.clientId] = assignment._id;
          assignments.push(assignment);
        }

        lessons.push({ ...lesson.toObject(), assignments });
      }

      units.push({ ...unit.toObject(), lessons });
    }

    return {
      course,
      units,
      idMap: {
        units: unitIdMap,
        lessons: lessonIdMap,
        assignments: assignmentIdMap,
      },
    };
  }
}

module.exports = new CourseService();
