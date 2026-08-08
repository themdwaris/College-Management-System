// import { useState } from "react";
// import { Outlet } from "react-router-dom";

// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-950">
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       <div className="md:ml-64 min-h-screen flex flex-col">
//         <Topbar setSidebarOpen={setSidebarOpen} />

//         <main className="flex-1 p-4 md:p-8 text-white">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="md:ml-64 min-h-screen flex flex-col">

        <div className="h-16 shrink-0">
          <Topbar setSidebarOpen={setSidebarOpen} />
        </div>

        <main className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 text-white">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout