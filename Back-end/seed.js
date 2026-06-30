const mongoose = require('mongoose');
const { hashPassword } = require('./src/shared/utils/hashHelper');

const User = require('./src/modules/users/user.model');
const Teacher = require('./src/modules/teachers/teacher.model');
const Student = require('./src/modules/students/student.model');
const Parent = require('./src/modules/parents/parent.model');
const Assistant = require('./src/modules/assistants/assistant.model');
const Course = require('./src/modules/courses/course.model');
const Chapter = require('./src/modules/chapters/chapter.model');
const Lesson = require('./src/modules/lessons/lesson.model');
const Assignment = require('./src/modules/assignments/assignment.model');
const Quiz = require('./src/modules/quizzes/quiz.model');
const Enrollment = require('./src/modules/enrollments/enrollment.model');
const Payment = require('./src/modules/payments/payment.model');
const Chat = require('./src/modules/chat/chat.model');
const ChatMember = require('./src/modules/chat/chatMember.model');
const Message = require('./src/modules/chat/message.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Tellm';
const DEFAULT_PASSWORD = '12345678';
const REQUIRED_ROW_COUNT = 25;

const createUserSeed = async (index, role, firstName, lastName) => {
  return User.create({
    FName: firstName,
    LName: lastName,
    Email: `${role.toLowerCase()}${String(index).padStart(2, '0')}@example.com`,
    SSN: `${String(index + 10000000000000).slice(0, 14)}`,
    Password: DEFAULT_PASSWORD,
    Phone: `+2010${String(10000000 + index).slice(0, 8)}`,
    Avatar: '/images/login.jpg',
    activeStatus: true,
    Role: role,
    isVerified: true,
  });
};

const seedDatabase = async () => {
  try {
    console.log(`Connecting to MongoDB at ${MONGO_URI} ...`);
    await mongoose.connect(MONGO_URI);
    console.log('💾 Connected successfully.');

    console.log('🧹 Resetting database...');
    await mongoose.connection.dropDatabase();

    const hashedPassword = await hashPassword(DEFAULT_PASSWORD);

    console.log('👤 Creating users and role profiles...');
    const adminUser = await User.create({
      FName: 'أحمد',
      LName: 'حسن',
      Email: 'admin@example.com',
      SSN: '11111111111111',
      Password: DEFAULT_PASSWORD,
      Phone: '+201001111111',
      Avatar: '/images/login.jpg',
      activeStatus: true,
      Role: 'Admin',
      isVerified: true,
    });

    const teacherUsers = [];
    const studentUsers = [];
    const parentUsers = [];

    for (let i = 1; i <= REQUIRED_ROW_COUNT; i += 1) {
      const teacherUser = await createUserSeed(i, 'Teacher', `معلم${i}`, `الاسم${i}`);
      teacherUsers.push(teacherUser);

      const studentUser = await createUserSeed(i + REQUIRED_ROW_COUNT, 'Student', `طالب${i}`, `الاسم${i}`);
      studentUsers.push(studentUser);

      const parentUser = await createUserSeed(i + REQUIRED_ROW_COUNT * 2, 'Parent', `ولي${i}`, `الاسم${i}`);
      parentUsers.push(parentUser);
    }

    const teacherProfiles = [];
    for (const teacherUser of teacherUsers) {
      const profile = await Teacher.create({ UserId: teacherUser._id });
      teacherProfiles.push(profile);
    }

    const parentProfiles = [];
    for (const parentUser of parentUsers) {
      const profile = await Parent.create({ UserId: parentUser._id, ChildrenNumber: 1 + (parentProfiles.length % 3) });
      parentProfiles.push(profile);
    }

    const studentProfiles = [];
    for (let i = 0; i < studentUsers.length; i += 1) {
      const parentProfile = parentProfiles[i % parentProfiles.length];
      const profile = await Student.create({ UserId: studentUsers[i]._id, ParentId: parentProfile._id });
      studentProfiles.push(profile);
    }

    const assistantProfiles = [];
    for (let i = 0; i < teacherProfiles.length; i += 1) {
      const assistant = await Assistant.create({
        TeacherId: teacherProfiles[i]._id,
        Email: `assistant${i + 1}@example.com`,
        Password: hashedPassword,
      });
      assistantProfiles.push(assistant);
    }

    console.log('📚 Creating courses, chapters, lessons, assignments and quizzes...');
    const courses = [];
    for (let i = 1; i <= REQUIRED_ROW_COUNT; i += 1) {
      const course = await Course.create({
        TeacherId: teacherProfiles[i - 1]._id,
        Title: `مسار ${i}`,
        Description: `وصف مفصل للمسار ${i} لإظهار بيانات متنوعة في الواجهة.`,
        Price: 100 + i * 10,
        CoverImage: '/images/course.jpg',
        Status: i % 2 === 0 ? 'published' : 'draft',
        PublishedAt: new Date(),
      });
      courses.push(course);
    }

    const chapters = [];
    for (let i = 0; i < courses.length; i += 1) {
      const chapter = await Chapter.create({ CourseId: courses[i]._id, Title: `باب ${i + 1}` });
      chapters.push(chapter);
    }

    const lessons = [];
    for (let i = 0; i < chapters.length; i += 1) {
      const lesson = await Lesson.create({
        ChapterId: chapters[i]._id,
        Title: `درس ${i + 1}`,
        Content: `محتوى الدرس ${i + 1} مع تمارين ومراجع.` ,
        Video: {
          url: `https://example.com/video-${i + 1}.mp4`,
          public_id: `video-${i + 1}`,
          resourceType: 'video',
          fileName: `lesson-${i + 1}.mp4`,
        },
      });
      lessons.push(lesson);
    }

    const assignments = [];
    for (let i = 0; i < lessons.length; i += 1) {
      const assignment = await Assignment.create({
        LessonId: lessons[i]._id,
        Title: `تدريب ${i + 1}`,
        Content: `حل التمرين ${i + 1} قبل الموعد النهائي.`,
      });
      assignments.push(assignment);
    }

    const quizzes = [];
    for (let i = 0; i < courses.length; i += 1) {
      const quiz = await Quiz.create({
        CourseId: courses[i]._id,
        Title: `اختبار ${i + 1}`,
        Content: `اختبار قصير على محتوى المسار ${i + 1}.`,
      });
      quizzes.push(quiz);
    }

    console.log('🧑‍🎓 Creating enrollments and payments...');
    const enrollments = [];
    for (let i = 0; i < studentProfiles.length; i += 1) {
      const enrollment = await Enrollment.create({
        StudentId: studentProfiles[i]._id,
        CourseId: courses[i % courses.length]._id,
        Progress: 20 + (i % 5) * 10,
      });
      enrollments.push(enrollment);
    }

    const payments = [];
    for (let i = 0; i < enrollments.length; i += 1) {
      const payment = await Payment.create({
        student: studentUsers[i % studentUsers.length]._id,
        course: courses[i % courses.length]._id,
        amount: 100 + i * 15,
        currency: 'EGP',
        status: i % 3 === 0 ? 'success' : i % 3 === 1 ? 'pending' : 'failed',
        specialRef: `course_${i + 1}_student_${i + 1}`,
      });
      payments.push(payment);
    }

    console.log('💬 Creating chat data...');
    const chats = [];
    for (let i = 1; i <= REQUIRED_ROW_COUNT; i += 1) {
      const chat = await Chat.create({
        type: i % 2 === 0 ? 'group' : 'private',
        groupName: i % 2 === 0 ? `مجموعة ${i}` : null,
        groupAvatar: i % 2 === 0 ? '/images/login.jpg' : null,
      });
      chats.push(chat);
    }

    const chatMembers = [];
    for (let i = 0; i < chats.length; i += 1) {
      const member = await ChatMember.create({
        chatId: chats[i]._id,
        userId: i % 2 === 0 ? teacherUsers[i % teacherUsers.length]._id : studentUsers[i % studentUsers.length]._id,
        unreadCount: i % 4,
      });
      chatMembers.push(member);
    }

    const messages = [];
    for (let i = 0; i < chats.length; i += 1) {
      const message = await Message.create({
        chatId: chats[i]._id,
        senderId: i % 2 === 0 ? teacherUsers[i % teacherUsers.length]._id : parentUsers[i % parentUsers.length]._id,
        content: `رسالة تجريبية رقم ${i + 1} لعرض بيانات المحادثات.`,
        messageType: 'text',
      });
      messages.push(message);
    }

    for (let i = 0; i < chats.length; i += 1) {
      const lastMessage = messages[i];
      chats[i].lastMessage = lastMessage._id;
      await chats[i].save();
    }

    console.log(`
🌱 Database Seeding Completed Successfully!
--------------------------------------------------
Created rows:
- Users: ${await User.countDocuments()}
- Teachers: ${await Teacher.countDocuments()}
- Students: ${await Student.countDocuments()}
- Parents: ${await Parent.countDocuments()}
- Assistants: ${await Assistant.countDocuments()}
- Courses: ${await Course.countDocuments()}
- Chapters: ${await Chapter.countDocuments()}
- Lessons: ${await Lesson.countDocuments()}
- Assignments: ${await Assignment.countDocuments()}
- Quizzes: ${await Quiz.countDocuments()}
- Enrollments: ${await Enrollment.countDocuments()}
- Payments: ${await Payment.countDocuments()}
- Chats: ${await Chat.countDocuments()}
- ChatMembers: ${await ChatMember.countDocuments()}
- Messages: ${await Message.countDocuments()}
--------------------------------------------------
Login credentials:
1. Admin: admin@example.com / ${DEFAULT_PASSWORD}
2. Teacher: teacher1@example.com / ${DEFAULT_PASSWORD}
3. Parent: parent1@example.com / ${DEFAULT_PASSWORD}
4. Student: student1@example.com / ${DEFAULT_PASSWORD}
        `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Database Seeding Failed:', error);
    process.exit(1);
  }
};

seedDatabase();