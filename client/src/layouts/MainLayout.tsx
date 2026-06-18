import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar/sidebar";
import Navbar from "../components/common/Navbar/navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
