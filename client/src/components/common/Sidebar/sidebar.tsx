import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "My Courses", icon: "📖" },
    { name: "Live Sessions", icon: "📹" },
    { name: "Messages", icon: "💬" },
    { name: "Notifications", icon: "🔔" },
    { name: "Quizzes", icon: "❓" },
    { name: "Assignments", icon: "📝" },
    { name: "Grades", icon: "📈" },
    { name: "Resources", icon: "📚" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between hidden lg:flex shrink-0 h-screen sticky top-0">
      <div>
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-50">
          <span className="text-blue-600 text-xl">🎓</span>
          <span className="font-bold text-xl tracking-tight text-blue-600">LearnHub</span>
        </div>

        {/* Links List */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeItem === item.name
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
              {activeItem === item.name && <span className="text-xs">›</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-50 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer">
          <span>🔄</span> Switch Role
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}