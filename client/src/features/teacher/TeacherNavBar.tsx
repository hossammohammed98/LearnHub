import Navbar from "@/components/common/Navbar"
import NotificationBell from "@/components/ui/NotificationBell"
import SearchBar from "@/components/ui/SearchBar"

function TeacherNavBar() {
    return (
            <Navbar
            centerContent={<SearchBar placeholder="ابحث عن دوره او طالب...."></SearchBar>}
            leftActions={<NotificationBell></NotificationBell>}
            ></Navbar>
      

    )
}

export default TeacherNavBar
