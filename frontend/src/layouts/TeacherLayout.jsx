// import { useState } from "react";
// import { Outlet } from "react-router-dom";

// import TeacherSidebar from "../components/TeacherSidebar";
// import Topbar from "../components/Topbar";

// const TeacherLayout = () => {
//   const [sidebarOpen, setSidebarOpen] =
//     useState(false);

//   return (
//     <div className="min-h-screen bg-slate-950 flex">

//       <TeacherSidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       <div className="flex-1 min-w-0 flex flex-col">

//         <Topbar
//           setSidebarOpen={setSidebarOpen}
//         />

//         <main className="flex-1 p-4 md:p-8 text-white overflow-x-auto">

//           <Outlet />

//         </main>

//       </div>

//     </div>
//   );
// };

// export default TeacherLayout;




import { useState } from "react";
import { Outlet } from "react-router-dom";

import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">

      <TeacherSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="md:ml-64 min-h-screen flex flex-col">

        {/* Topbar */}
        <div className="h-16 shrink-0">
          <Topbar
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Main */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 text-white">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default TeacherLayout;