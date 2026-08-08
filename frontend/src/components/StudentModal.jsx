import { useEffect, useState } from "react";
import { getDepartments } from "../services/departmentService";
import { getClasses } from "../services/classService";

const StudentModal = ({ isOpen, onClose, onSave, student, setIsOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const departmentData = await getDepartments();
      const classData = await getClasses();

      setDepartments(departmentData);
      setClasses(classData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
      setRollNumber(student.rollNumber);

      setDepartment(student.department?._id || "");
      setClassId(student.classId?._id || "");

      setPassword("");
    } else {
      setName("");
      setEmail("");
      setRollNumber("");
      setPassword("");

      setDepartment("");
      setClassId("");
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     const studentData = {
  //       name,
  //       email,
  //       rollNumber,
  //       department,
  //       classId,
  //     };

  //     if (!student) {
  //       studentData.password = password;
  //     }

  //     onSave(studentData);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      name,
      email,
      rollNumber,
      department,
      classId,
    };

    if (!student) {
      studentData.password = password;
    }

    try {
      setLoading(true);

      await onSave(studentData);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-2xl font-bold mb-6">
          {student ? "Edit Student" : "Add Student"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 item-center justify-center gap-3"
        >
          {/* Name */}

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Student Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}

          <div>
            <label className="block mb-2 text-sm text-slate-300">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Roll Number */}

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Roll Number
            </label>

            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}

          {!student && (
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          {/* Department */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Department
            </label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Department</option>

              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* class */}

          <div>
            <label className="block mb-2 text-sm text-slate-300">Class</label>

            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Class</option>

              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}

          <div className="w-full flex gap-3 pt-3 justify-center items-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>

            {/* <button
              type="submit"
              className="w-full px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              {student ? "Update" : "Add"}
            </button> */}

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : student ? (
                "Update"
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
