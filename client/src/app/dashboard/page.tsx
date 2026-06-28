import ProfileSettings from '@/features/settings/SettingsSidebar';
import  TeacherSideBar from '@/features/teacher/TeacherSideBar';

function page() {
  return (
    <div>
      <ProfileSettings></ProfileSettings>
      <TeacherSideBar/>
    </div>
  )
}

export default page