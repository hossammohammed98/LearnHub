import Navbar from '@/components/common/Navbar';
import NotificationBell from '@/components/ui/NotificationBell';
import SearchBar from '@/components/ui/SearchBar';
import StudentNavLinks from './StudentNavLinks';

function StudentNavBar() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
       centerContent={<SearchBar placeholder='ابحث عن دوره....'></SearchBar>}
       leftActions={
        <NotificationBell></NotificationBell>
       }
       rightActions={<StudentNavLinks></StudentNavLinks>}
      >
      </Navbar>    
    </div>
  );
}

export default StudentNavBar;