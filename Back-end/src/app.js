const express=require('express')
const globalErrorHandler=require('./middlewares/errorHandler.middleware')

const rateLimiter = require('./middlewares/rateLimiter');

const security = require('./middlewares/security');
const cors = require('./middlewares/cors');   


const authRoute=require('./modules/auth/auth.route');
const assignmentRoute=require('./modules/assignments/assignment.route');
const chapterRoute=require('./modules/chapters/chapter.route');
// const chatRoute=require('./modules/chat');
const courseRoute=require('./modules/courses/course.route');
const lessonRoute=require('./modules/lessons/lesson.route');
const parentRoute=require('./modules/parents/parent.route');
const quizzesRoute=require('./modules/quizzes/quiz.route');
const studentRoute=require('./modules/students/student.route');
const teacherRoute=require('./modules/teachers/teacher.route');

const app=express();

app.use(security.create());
app.use(cors.create());   // ← Added (using our new middleware)


// Global rate limiting (moderate)
app.use(rateLimiter.create({
    windowMs: 15 * 60 * 1000,
    limit: 150
}));

// Stricter limiter for auth routes
const authLimiter = rateLimiter.create({
    windowMs: 60 * 60 * 1000,   // 1 hour
    limit: 10,
    message: 'Too many login attempts. Please try again later.'
});



app.use(express.json());

app.use('/api/v1/auth',authRoute);

const apiLimiter = rateLimiter.create({
    windowMs: 15 * 60 * 1000,
    limit: 300
});

app.use(apiLimiter)

app.use('/api/v1/assignment',assignmentRoute);
app.use('/api/v1/chapter',chapterRoute);
// app.use('api/v1/chat',chatRoute);
app.use('/api/v1/course',courseRoute);
app.use('/api/v1/lesson',lessonRoute);
app.use('/api/v1/parent',parentRoute);
app.use('/api/v1/quizzes',quizzesRoute);
app.use('/api/v1/student',studentRoute);
app.use('/api/v1/teacher',teacherRoute);

app.use(globalErrorHandler);

module.exports=app;