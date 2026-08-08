import { LayoutDashboard, ClipboardCheck, LogOut, X } from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const TeacherSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      path: "/teacher/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Attendance",
      path: "/teacher/attendance",
      icon: ClipboardCheck,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
  className={`
    fixed
    top-0
    left-0
    z-50
    h-screen
    w-64
    bg-slate-900
    border-r border-slate-800
    flex flex-col
    transform
    transition-transform
    duration-300

    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0"
    }
  `}
>
        {/* Logo */}

        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-blue-500">CollegeMS</h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 p-4 space-y-2">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <menu.icon size={20} />

              {menu.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;
