

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import TeacherLayout from "./layouts/TeacherLayout";

import ProtectedRoutes from "./components/ProtectedRoutes";
import RoleRoute from "./components/RoleRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import Departments from "./pages/admin/Departments";
import Students from "./pages/admin/Students";
import Classes from "./pages/admin/Classes";
import Teachers from "./pages/admin/Teachers";
import Courses from "./pages/admin/Courses";

// Teacher
import Attendance from "./pages/teacher/Attendance";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            MAIN WEBSITE
        ========================== */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

        </Route>


        {/* =========================
            AUTHENTICATED ROUTES
        ========================== */}

        <Route element={<ProtectedRoutes />}>


          {/* ================= ADMIN ================= */}

          <Route element={<RoleRoute allowedRole="admin" />}>

            <Route path="/admin" element={<DashboardLayout />}>

              <Route
                path="dashboard"
                element={<Dashboard />}
              />

              <Route
                path="departments"
                element={<Departments />}
              />

              <Route
                path="students"
                element={<Students />}
              />

              <Route
                path="classes"
                element={<Classes />}
              />

              <Route
                path="teachers"
                element={<Teachers />}
              />

              <Route
                path="courses"
                element={<Courses />}
              />

            </Route>

          </Route>


          {/* ================= TEACHER ================= */}

          <Route element={<RoleRoute allowedRole="teacher" />}>

            <Route path="/teacher" element={<TeacherLayout />}>

              <Route
                path="dashboard"
                element={<TeacherDashboard />}
              />

              <Route
                path="attendance"
                element={<Attendance />}
              />

            </Route>

          </Route>

        </Route>


        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
