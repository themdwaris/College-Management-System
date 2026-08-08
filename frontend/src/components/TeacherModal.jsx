import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { getDepartments } from "../services/departmentService";

const TeacherModal = ({
  isOpen,
  onClose,
  onSave,
  teacher,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load departments
  useEffect(() => {
    if (isOpen) {
      loadDepartments();
    }
  }, [isOpen]);

  // Set form data
  useEffect(() => {
    if (teacher) {
      setName(teacher.name || "");
      setEmail(teacher.email || "");
      setDepartment(teacher.department?._id || "");
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setDepartment("");
    }
  }, [teacher, isOpen]);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();

      setDepartments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherData = {
      name,
      email,
      department,
    };

    // Password only required while creating
    if (!teacher) {
      teacherData.password = password;
    }

    try {
      setLoading(true);

      await onSave(teacherData);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">

          <div>
            <h2 className="text-xl font-bold text-white">
              {teacher ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {teacher
                ? "Update teacher information"
                : "Create a new teacher"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
          >
            <X size={20} className="text-slate-400" />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Teacher Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter teacher name"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter teacher email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                teacher
                  ? "Leave blank to keep current password"
                  : "Enter password"
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
              required={!teacher}
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Department
            </label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
              required
            >
              <option value="">
                Select Department
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

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="min-w-[120px] px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                  {teacher ? "Updating..." : "Creating..."}
                </>
              ) : (
                teacher ? "Update Teacher" : "Add Teacher"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default TeacherModal;