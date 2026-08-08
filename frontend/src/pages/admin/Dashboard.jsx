import { useEffect, useState } from "react";

import DashboardCard from "../../components/DashboardCard";
import { getAdminDashboard } from "../../services/adminService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminDashboard();

        setDashboard(data);
      } catch (error) {
        console.log("ADMIN DASHBOARD ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Overview of your college management system
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <DashboardCard
          title="Students"
          value={dashboard.students}
        />

        <DashboardCard
          title="Teachers"
          value={dashboard.teachers}
        />

        <DashboardCard
          title="Departments"
          value={dashboard.departments}
        />

        <DashboardCard
          title="Courses"
          value={dashboard.courses}
        />

      </div>

    </div>
  );
};

export default Dashboard;