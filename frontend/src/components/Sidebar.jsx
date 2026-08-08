import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  LogOut,
  X,
  BookMarkedIcon,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Departments",
      path: "/admin/departments",
      icon: Building2,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: Users,
    },
    {
      name: "Classes",
      path: "/admin/classes",
      icon: BookMarkedIcon,
    },
    {
      name: "Teachers",
      path: "/admin/teachers",
      icon: GraduationCap,
    },
    {
      name: "Courses",
      path: "/admin/courses",
      icon: BookOpen,
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
          border-r
          border-slate-800
          flex
          flex-col
          transition-transform
          duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}

        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-blue-500">CollegeMS</h1>

          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="text-white" size={24} />
          </button>
        </div>

        {/* Menu */}

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-5">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 text-md py-2.5 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <menu.icon size={20} />

              <span>{menu.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}

        <div className="border-t border-slate-800 p-4">
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

export default Sidebar;
