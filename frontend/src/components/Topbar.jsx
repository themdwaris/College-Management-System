import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const Topbar = ({ setSidebarOpen }) => {
  const location = useLocation();

  const { user } = useContext(AuthContext);

  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("departments")) return "Departments";
    if (path.includes("students")) return "Students";
    if (path.includes("classes")) return "Classes";
    if (path.includes("teachers")) return "Teachers";
    if (path.includes("courses")) return "Courses";
    if (path.includes("attendance")) return "Attendance";

    return "Dashboard";
  };

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden"
        >
          <Menu
            size={26}
            className="text-white"
          />
        </button>

        <div>
          <h2 className="text-xl font-bold text-white">
            {getTitle()}
          </h2>

          <p className="text-slate-400 text-xs hidden sm:block">
            Welcome Back 👋
          </p>
        </div>

      </div>


      {/* Right */}

      <div className="flex items-center gap-3">

        <div className="hidden sm:block text-right">

          <p className="text-white font-medium">
            {userName}
          </p>

          <p className="text-xs text-slate-400">
            {userEmail}
          </p>

        </div>

        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-medium text-white">
          {avatarLetter}
        </div>

      </div>

    </header>
  );
};

export default Topbar;