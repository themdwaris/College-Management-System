import { useEffect, useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

import { getMyClasses } from "../../services/classService";
import { getStudentsByClass } from "../../services/studentService";

import {
  getAttendanceByClass,
  markAttendance,
} from "../../services/attendanceService";

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState({});

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [pastAttendance, setPastAttendance] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // ==========================
  // Attendance Filter
  // ==========================

  const [statusFilter, setStatusFilter] = useState("All");

  // ==========================
  // Filtered Attendance
  // ==========================

  const filteredPastAttendance =
    statusFilter === "All"
      ? pastAttendance
      : pastAttendance.filter(
          (item) => item.status === statusFilter
        );

  // ==========================
  // Load Attendance History
  // ==========================

  const fetchAttendanceHistory = async () => {
    if (!selectedClass) {
      setPastAttendance([]);
      return;
    }

    try {
      setLoadingHistory(true);
      setError("");

      const data = await getAttendanceByClass(selectedClass);

      setPastAttendance(data);
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to load attendance history"
      );
    } finally {
      setLoadingHistory(false);
    }
  };

  // ==========================
  // Load Classes
  // ==========================

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoadingClasses(true);

        const data = await getMyClasses();

        setClasses(data);
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Failed to load classes"
        );
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  // ==========================
  // Load Students
  // ==========================

  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setAttendance({});
      setPastAttendance([]);
      return;
    }

    fetchStudents();
    fetchAttendanceHistory();
  }, [selectedClass]);

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);
      setError("");
      setMessage("");

      const studentData =
        await getStudentsByClass(selectedClass);

      setStudents(studentData);

      // Default everyone Present
      const defaultAttendance = {};

      studentData.forEach((student) => {
        defaultAttendance[student._id] = "Present";
      });

      setAttendance(defaultAttendance);

      // Check already marked attendance
      const existingAttendance =
        await getAttendanceByClass(
          selectedClass,
          date
        );

      existingAttendance.forEach((item) => {
        if (item.student?._id) {
          defaultAttendance[item.student._id] =
            item.status;
        }
      });

      setAttendance({
        ...defaultAttendance,
      });
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to load students"
      );
    } finally {
      setLoadingStudents(false);
    }
  };

  // ==========================
  // Date Change
  // ==========================

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;

    setDate(selectedDate);
    setError("");
    setMessage("");

    if (!selectedClass) return;

    try {
      setLoadingStudents(true);

      const existingAttendance =
        await getAttendanceByClass(
          selectedClass,
          selectedDate
        );

      const updatedAttendance = {};

      // Default: Present
      students.forEach((student) => {
        updatedAttendance[student._id] = "Present";
      });

      // Existing records overwrite default
      existingAttendance.forEach((item) => {
        if (item.student?._id) {
          updatedAttendance[item.student._id] =
            item.status;
        }
      });

      setAttendance(updatedAttendance);
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to load attendance"
      );
    } finally {
      setLoadingStudents(false);
    }
  };

  // ==========================
  // Change Status
  // ==========================

  const handleStatusChange = (
    studentId,
    status
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // ==========================
  // Save Attendance
  // ==========================

  const handleSubmit = async () => {
    if (!selectedClass) {
      setError("Please select a class");
      return;
    }

    if (!students.length) {
      setError("No students found");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const attendanceData = students.map(
        (student) => ({
          studentId: student._id,
          status:
            attendance[student._id] ||
            "Present",
        })
      );

      await markAttendance({
        classId: selectedClass,
        date,
        attendance: attendanceData,
      });

      setMessage(
        "Attendance saved successfully"
      );

      await fetchAttendanceHistory();
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to save attendance"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Attendance
        </h1>

        <p className="text-slate-400 mt-1 text-sm">
          Mark and manage student attendance
        </p>
      </div>

      {/* Filters */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Class */}

          <div>
            <label className="text-sm text-slate-300">
              Select Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(e.target.value)
              }
              disabled={loadingClasses}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">
                {loadingClasses
                  ? "Loading classes..."
                  : "Select Class"}
              </option>

              {classes.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}

          <div>
            <label className="text-sm text-slate-300">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Success */}

      {message && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} />
          {message}
        </div>
      )}

      {/* Students */}

      {selectedClass && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          {loadingStudents ? (
            <div className="flex items-center justify-center py-16 text-slate-400">

              <Loader2
                size={24}
                className="animate-spin mr-2"
              />

              Loading students...
            </div>
          ) : students.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              No students found in this class.
            </div>
          ) : (
            <>
              {/* Table */}

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px]">

                  <thead className="bg-slate-800">

                    <tr>
                      <th className="text-left p-4">
                        Roll No
                      </th>

                      <th className="text-left p-4">
                        Student
                      </th>

                      <th className="text-left p-4">
                        Attendance
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {students.map((student) => (
                      <tr
                        key={student._id}
                        className="border-t border-slate-800"
                      >

                        <td className="p-4 text-slate-300">
                          {student.rollNumber}
                        </td>

                        <td className="p-4 text-white font-medium">
                          {student.name}
                        </td>

                        <td className="p-4">

                          <div className="flex gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  student._id,
                                  "Present"
                                )
                              }
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                attendance[
                                  student._id
                                ] === "Present"
                                  ? "bg-green-600 text-white"
                                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                              }`}
                            >
                              Present
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  student._id,
                                  "Absent"
                                )
                              }
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                attendance[
                                  student._id
                                ] === "Absent"
                                  ? "bg-red-600 text-white"
                                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                              }`}
                            >
                              Absent
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  student._id,
                                  "Late"
                                )
                              }
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                attendance[
                                  student._id
                                ] === "Late"
                                  ? "bg-yellow-600 text-white"
                                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                              }`}
                            >
                              Late
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              {/* Save */}

              <div className="p-5 border-t border-slate-800 flex justify-end">

                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 transition"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    "Save Attendance"
                  )}
                </button>

              </div>
            </>
          )}

        </div>
      )}

      {/* Past Attendance */}

      {selectedClass && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          {/* Past Attendance Header */}

          <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h2 className="text-lg font-semibold text-white">
                Past Attendance
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                View previous attendance records
              </p>
            </div>

            {/* Status Filter */}

            <div>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>

                <option value="Late">
                  Late
                </option>
              </select>
            </div>

          </div>

          {/* History */}

          {loadingHistory ? (
            <div className="flex justify-center items-center py-12 text-slate-400">

              <Loader2
                size={22}
                className="animate-spin mr-2"
              />

              Loading attendance...
            </div>
          ) : filteredPastAttendance.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              No attendance records found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead className="bg-slate-800">

                  <tr>

                    <th className="text-left p-4 text-slate-300">
                      Date
                    </th>

                    <th className="text-left p-4 text-slate-300">
                      Roll No
                    </th>

                    <th className="text-left p-4 text-slate-300">
                      Student
                    </th>

                    <th className="text-left p-4 text-slate-300">
                      Status
                    </th>

                    <th className="text-left p-4 text-slate-300">
                      Marked By
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredPastAttendance.map(
                    (item) => (

                      <tr
                        key={item._id}
                        className="border-t border-slate-800"
                      >

                        <td className="p-4 text-slate-300">
                          {item.date}
                        </td>

                        <td className="p-4 text-slate-300">
                          {item.student?.rollNumber ||
                            "N/A"}
                        </td>

                        <td className="p-4 text-white font-medium">
                          {item.student?.name ||
                            "N/A"}
                        </td>

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              item.status ===
                              "Present"
                                ? "bg-green-500/10 text-green-400"
                                : item.status ===
                                  "Absent"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>

                        <td className="p-4 text-slate-400">
                          {item.teacher?.name ||
                            "N/A"}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default Attendance;