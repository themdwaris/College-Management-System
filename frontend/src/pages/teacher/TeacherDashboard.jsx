import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Building2,
  GraduationCap,
} from "lucide-react";

import { getMyTeacherDashboard } from "../../services/teacherService";

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getMyTeacherDashboard();

        setTeacherData(data);
      } catch (error) {
        console.log(
          "TEACHER DASHBOARD ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  if (!teacherData) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-red-400">
        Failed to load dashboard
      </div>
    );
  }

  const { teacher, classes = [] } = teacherData;

  // Total students across all assigned classes
  const totalStudents = classes.reduce(
    (total, item) =>
      total + (item.students?.length || 0),
    0
  );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Welcome, {teacher.name}
        </h1>

        <p className="text-slate-400 mt-1">
          Manage your classes and student attendance.
        </p>
      </div>


      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Department */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

          <div className="flex items-center gap-3">

            <div className="p-3 rounded-xl bg-blue-500/10">
              <Building2
                size={22}
                className="text-blue-400"
              />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Department
              </p>

              <h2 className="text-white font-semibold mt-1">
                {teacher.department?.name || "N/A"}
              </h2>
            </div>

          </div>

        </div>


        {/* Assigned Classes */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

          <div className="flex items-center gap-3">

            <div className="p-3 rounded-xl bg-purple-500/10">
              <BookOpen
                size={22}
                className="text-purple-400"
              />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Assigned Classes
              </p>

              <h2 className="text-2xl text-white font-bold mt-1">
                {classes.length}
              </h2>
            </div>

          </div>

        </div>


        {/* Total Students */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

          <div className="flex items-center gap-3">

            <div className="p-3 rounded-xl bg-green-500/10">
              <Users
                size={22}
                className="text-green-400"
              />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Total Students
              </p>

              <h2 className="text-2xl text-white font-bold mt-1">
                {totalStudents}
              </h2>
            </div>

          </div>

        </div>

      </div>


      {/* My Classes */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-5 border-b border-slate-800">

          <h2 className="text-lg font-semibold text-white">
            My Classes
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Classes assigned to you
          </p>

        </div>


        {classes.length === 0 ? (

          <div className="p-8 text-center text-slate-500">
            No classes assigned.
          </div>

        ) : (

          <div className="divide-y divide-slate-800">

            {classes.map((item) => (

              <div
                key={item._id}
                className="p-5"
              >

                {/* Class Header */}

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-white font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      {item.department?.name ||
                        "Department N/A"}
                    </p>

                  </div>

                  <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                    {item.students?.length || 0} Students
                  </span>

                </div>


                {/* Students */}

                {item.students?.length > 0 ? (

                  <div className="mt-5">

                    <div className="flex items-center gap-2 mb-3">

                      <GraduationCap
                        size={18}
                        className="text-blue-400"
                      />

                      <h4 className="text-sm font-medium text-slate-300">
                        Student List
                      </h4>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                      {item.students.map(
                        (student, index) => (

                          <div
                            key={student._id}
                            className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                          >

                            <div className="flex items-center justify-between gap-3">

                              <div>

                                <p className="text-white font-medium">
                                  {student.name}
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                  Roll No:{" "}
                                  {student.rollNumber}
                                </p>

                              </div>

                              <span className="text-xs text-slate-500">
                                #{index + 1}
                              </span>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                ) : (

                  <div className="mt-5 text-sm text-slate-500">
                    No students assigned to this class.
                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default TeacherDashboard;