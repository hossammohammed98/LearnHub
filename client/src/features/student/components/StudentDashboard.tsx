import Navbar from '@/components/common/Navbar';
import NotificationBell from '@/components/ui/NotificationBell';
import SearchBar from '@/components/ui/SearchBar';
import StudentNavLinks from './StudentNavLinks';
import SideBar from '@/components/common/SideBar';
import HeroSection from './HeroSection';
import MetricCard from '@/components/ui/MetricCard';
import { BookAIcon, CircleCheck, FileQuestion, PlayCircle, PlayCircleIcon } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import CurrentCourse from './CurrentCourse';
import CourseDescription from './CourseDescription';
import Calender from './Calender';
import CalenderItem from './CalenderItem';
import ButtonInit from '@/components/ui/ButtonInit';

function StudentDashboard() {

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar
       centerContent={<SearchBar placeholder='ابحث عن دوره....'></SearchBar>}
       leftActions={
        <NotificationBell></NotificationBell>
       }
       rightActions={<StudentNavLinks></StudentNavLinks>}
      >
      </Navbar> 

      <div className='flex flex-1 overflow-hidden'>
        <SideBar />

        <main className='flex-1 overflow-y-auto px-4 md:px-8 py-8 max-w-screen-xl mx-auto w-full'>
            <HeroSection userName='أحمد'></HeroSection>
          <section aria-label="ملخص الإحصائيات" className="mt-8 flex flex-wrap gap-4">
                <MetricCard icon={<BookAIcon className="w-5 h-5"></BookAIcon>} tag='+2 جدبد' title='اجمالى الدورات' value={8} iconType='info' tagType='success'></MetricCard> 
                <MetricCard icon={<CircleCheck className="w-5 h-5"></CircleCheck>} tag={<Progress value={40} size='sm'  showLabel></Progress>} title='الدروس المكتملة' value={24} iconType='success' ></MetricCard>
                <MetricCard icon={<FileQuestion className="w-5 h-5"></FileQuestion>} tag={<Badge variant='danger' >عاجل</Badge>} title='الاختبارات المعلقه' value={3} iconType='danger'></MetricCard>
          </section>
          <section aria-label="الدورة الحالية والجلسات" className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                <div className="md:col-span-2 flex flex-col sm:flex-row w-full gap-0 overflow-hidden rounded-lg border border-gray-100 shadow-sm">
                        <CurrentCourse badge={<Badge variant='success'>قيد التقدم</Badge>} courseLevel={<Badge variant='neutral'>المستوى المتقدم</Badge>}></CurrentCourse>
                       <CourseDescription courseDescription="تعلّم كيفية بناء استراتيجيات قوية تعزز من
                        كفاءة الأداء المؤسسي في البيئات التعليمية
                        الحديثة والتقنيات الصاعدة."
                        courseName="الاستراتيجيات المتقدمة في
                        إدارة المؤسسات الأكاديمية"
                      title="دورة القيادة التنفيذية">
                        <Progress value={40} showLabel={true}></Progress>
                        <ButtonInit>متابعة التعلم  <PlayCircleIcon></PlayCircleIcon> </ButtonInit>
                      </CourseDescription>
                   
                </div>
                <div className="w-full">
                    <Calender>
                       <CalenderItem title={'حلقة بحث: الذكاء الاصطناعي'} day="اليوم" hour={'، 04:00 م'}></CalenderItem>
                       <CalenderItem title={'إدارة الموارد البشرية'} day="غداً" hour={'، 10:00 م'}></CalenderItem>
                    </Calender>
                </div>
          </section>
        </main>
      </div>   
    </div>
  );
}

export default StudentDashboard;