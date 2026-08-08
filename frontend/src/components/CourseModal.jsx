import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

import { getDepartments } from "../services/departmentService";
import { getTeachers } from "../services/teacherService";
import { getClasses } from "../services/classService";

const CourseModal = ({
  isOpen,
  onClose,
  onSave,
  course,
}) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState("");
  const [classId, setClassId] = useState("");

  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // Load dropdown data
  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      try {
        setLoadingData(true);
        setError("");

        const [
          departmentData,
          teacherData,
          classData,
        ] = await Promise.all([
          getDepartments(),
          getTeachers(),
          getClasses(),
        ]);

        setDepartments(departmentData);
        setTeachers(teacherData);
        setClasses(classData);
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Failed to load form data"
        );
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [isOpen]);

  // Set form values
  useEffect(() => {
    if (course) {
      setName(course.name || "");

      setDepartment(
        course.department?._id ||
          course.department ||
          ""
      );

      setTeacher(
        course.teacher?._id ||
          course.teacher ||
          ""
      );

      setClassId(
        course.classId?._id ||
          course.classId ||
          ""
      );
    } else {
      setName("");
      setDepartment("");
      setTeacher("");
      setClassId("");
    }

    setError("");
  }, [course, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Course name is required");
      return;
    }

    if (!department) {
      setError("Department is required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await onSave({
        name: name.trim(),
        department,
        teacher: teacher || null,
        classId: classId || null,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">

          <div>
            <h2 className="text-xl font-bold text-white">
              {course ? "Edit Course" : "Add Course"}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {course
                ? "Update course details"
                : "Create a new course"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Error */}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Course Name */}

          <div>
            <label className="text-sm text-slate-300">
              Course Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Data Structures"
              disabled={saving}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          {/* Department */}

          <div>
            <label className="text-sm text-slate-300">
              Department
            </label>

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              disabled={saving || loadingData}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">
                {loadingData
                  ? "Loading..."
                  : "Select Department"}
              </option>

              {departments.map((dept) => (
                <option
                  key={dept._id}
                  value={dept._id}
                >
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}

          <div>
            <label className="text-sm text-slate-300">
              Teacher
              <span className="text-slate-500 ml-1">
                (Optional)
              </span>
            </label>

            <select
              value={teacher}
              onChange={(e) =>
                setTeacher(e.target.value)
              }
              disabled={saving || loadingData}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">
                Select Teacher
              </option>

              {teachers.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}

          <div>
            <label className="text-sm text-slate-300">
              Class
              <span className="text-slate-500 ml-1">
                (Optional)
              </span>
            </label>

            <select
              value={classId}
              onChange={(e) =>
                setClassId(e.target.value)
              }
              disabled={saving || loadingData}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">
                Select Class
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

          {/* Buttons */}

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || loadingData}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : course ? (
                "Update Course"
              ) : (
                "Create Course"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CourseModal;