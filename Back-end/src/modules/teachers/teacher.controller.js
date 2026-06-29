const BaseController = require('../../shared/core/BaseController');
const TeacherService = require('./teacher.service');
const catchAsyncHandler = require('../../shared/utils/catchAsyncHandler');
const ApiError = require('../../shared/core/ApiError');
const ApiResponse = require('../../shared/core/ApiResponse');
const Teacher = require('./teacher.model');
const Course = require('../courses/course.model');
const Enrollment = require('../enrollments/enrollment.model');

const MONTH_NAMES_AR = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

function getMonthKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function buildRecentGrowthData(enrollments) {
  const now = new Date();
  const months = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    months.push({
      key: getMonthKey(targetDate),
      month: MONTH_NAMES_AR[targetDate.getMonth()],
      value: 0,
    });
  }

  enrollments.forEach((enrollment) => {
    if (!enrollment.createdAt) {
      return;
    }

    const createdAt = new Date(enrollment.createdAt);
    const month = months.find((item) => item.key === getMonthKey(createdAt));

    if (month) {
      month.value += 1;
    }
  });

  return months.map(({ month, value }) => ({ month, value }));
}

class TeacherController extends BaseController {
    constructor() {
        super(TeacherService);
    }

    dashboard = catchAsyncHandler(async (req, res, next) => {
        const teacher = await Teacher.findOne({ UserId: req.user.id })
            .populate({ path: 'UserId', select: 'FName LName Avatar Role' })
            .lean();

        if (!teacher) {
            throw new ApiError(404, 'Teacher profile not found');
        }

        const courses = await Course.find({ TeacherId: teacher._id })
            .sort({ createdAt: -1 })
            .lean();

        const courseIds = courses.map((course) => course._id);
        const enrollments = courseIds.length
            ? await Enrollment.find({ CourseId: { $in: courseIds } }).lean()
            : [];

        const enrollmentCountByCourse = enrollments.reduce((accumulator, enrollment) => {
            const courseId = String(enrollment.CourseId);
            accumulator[courseId] = (accumulator[courseId] || 0) + 1;
            return accumulator;
        }, {});

        const uniqueStudentIds = new Set(enrollments.map((enrollment) => String(enrollment.StudentId)));

        const now = new Date();
        const currentMonthKey = getMonthKey(now);
        const previousMonthKey = getMonthKey(new Date(now.getFullYear(), now.getMonth() - 1, 1));

        const currentMonthEnrollments = enrollments.filter(
            (enrollment) => enrollment.createdAt && getMonthKey(new Date(enrollment.createdAt)) === currentMonthKey
        ).length;

        const previousMonthEnrollments = enrollments.filter(
            (enrollment) => enrollment.createdAt && getMonthKey(new Date(enrollment.createdAt)) === previousMonthKey
        ).length;

        let monthlyTrend = 0;
        if (previousMonthEnrollments === 0) {
            monthlyTrend = currentMonthEnrollments > 0 ? 100 : 0;
        } else {
            monthlyTrend = Math.round(((currentMonthEnrollments - previousMonthEnrollments) / previousMonthEnrollments) * 100);
        }

        const recentCourses = courses.slice(0, 3).map((course) => ({
            id: String(course._id),
            name: course.Title,
            studentNum: enrollmentCountByCourse[String(course._id)] || 0,
            rating: 0,
            ratingCount: 0,
            state: 'نشط',
        }));

        const dashboard = {
            teacherName: `${teacher.UserId?.FName || ''} ${teacher.UserId?.LName || ''}`.trim(),
            metrics: [
                {
                    key: 'students',
                    title: 'إجمالي الطلاب',
                    value: uniqueStudentIds.size,
                    tag: `${currentMonthEnrollments} هذا الشهر`,
                    tagType: 'info',
                },
                {
                    key: 'courses',
                    title: 'إجمالي الدورات',
                    value: courses.length,
                    tag: `${recentCourses.length} حديثة`,
                    tagType: 'success',
                },
                {
                    key: 'enrollments',
                    title: 'إجمالي التسجيلات',
                    value: enrollments.length,
                    tag: `${monthlyTrend >= 0 ? '+' : ''}${monthlyTrend}% عن الشهر السابق`,
                    tagType: monthlyTrend >= 0 ? 'success' : 'danger',
                },
                {
                    key: 'monthEnrollments',
                    title: 'تسجيلات هذا الشهر',
                    value: currentMonthEnrollments,
                    tag: courses.length ? 'محدث' : 'لا توجد دورات',
                    tagType: courses.length ? 'info' : 'danger',
                },
            ],
            recentCourses,
            growthData: buildRecentGrowthData(enrollments),
            liveSessions: [],
            quickTasks: [],
        };

        return ApiResponse.success(res, 'Teacher dashboard data returned successfully', dashboard, 200);
    });
}

module.exports = new TeacherController();
