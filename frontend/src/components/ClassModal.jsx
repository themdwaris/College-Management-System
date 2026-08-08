// import { useEffect, useState } from "react";
// import { X } from "lucide-react";

// import { getDepartments } from "../services/departmentService";

// const ClassModal = ({
//   isOpen,
//   onClose,
//   onSave,
//   classData,
// }) => {
//   const [name, setName] = useState("");
//   const [department, setDepartment] = useState("");

//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load departments
//   useEffect(() => {
//     if (isOpen) {
//       loadDepartments();
//     }
//   }, [isOpen]);

//   // Set existing class data when editing
//   useEffect(() => {
//     if (classData) {
//       setName(classData.name || "");
//       setDepartment(classData.department?._id || "");
//     } else {
//       setName("");
//       setDepartment("");
//     }
//   }, [classData, isOpen]);

//   const loadDepartments = async () => {
//     try {
//       const data = await getDepartments();

//       setDepartments(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !department) {
//       return;
//     }

//     try {
//       setLoading(true);

//       await onSave({
//         name,
//         department,
//       });

//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

//       {/* Overlay */}
//       <div
//         onClick={onClose}
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//       />

//       {/* Modal */}
//       <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-slate-800">

//           <div>
//             <h2 className="text-xl font-bold text-white">
//               {classData ? "Edit Class" : "Add Class"}
//             </h2>

//             <p className="text-sm text-slate-400 mt-1">
//               {classData
//                 ? "Update class information"
//                 : "Create a new class"}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-slate-800 transition"
//           >
//             <X size={20} className="text-slate-400" />
//           </button>

//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="p-6 space-y-5"
//         >

//           {/* Class Name */}
//           <div>

//             <label className="block text-sm text-slate-300 mb-2">
//               Class Name
//             </label>

//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="e.g. BCA First Year"
//               className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
//               required
//             />

//           </div>

//           {/* Department */}
//           <div>

//             <label className="block text-sm text-slate-300 mb-2">
//               Department
//             </label>

//             <select
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//               className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
//               required
//             >

//               <option value="">
//                 Select Department
//               </option>

//               {departments.map((dept) => (
//                 <option
//                   key={dept._id}
//                   value={dept._id}
//                 >
//                   {dept.name}
//                 </option>
//               ))}

//             </select>

//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 pt-2">

//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="min-w-[110px] px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
//             >

//               {loading ? (
//                 <>
//                   <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

//                   {classData ? "Updating..." : "Creating..."}
//                 </>
//               ) : (
//                 classData ? "Update Class" : "Add Class"
//               )}

//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default ClassModal;

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

import { getDepartments } from "../services/departmentService";
import { getTeachers } from "../services/teacherService";

const ClassModal = ({ isOpen, onClose, onSave, classData, setIsOpen }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState("");

  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load Departments + Teachers
  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      try {
        setLoadingData(true);
        setError("");

        const [departmentData, teacherData] = await Promise.all([
          getDepartments(),
          getTeachers(),
        ]);

        setDepartments(departmentData);
        setTeachers(teacherData);
      } catch (error) {
        console.log(error);

        setError(error.response?.data?.message || "Failed to load data");
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [isOpen]);

  // Fill form when editing
  useEffect(() => {
    if (classData) {
      setName(classData.name || "");

      setDepartment(classData.department?._id || classData.department || "");

      setTeacher(classData.teacher?._id || classData.teacher || "");
    } else {
      setName("");
      setDepartment("");
      setTeacher("");
    }

    setError("");
  }, [classData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !department) {
      setError("Class name and department are required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await onSave({
        name: name.trim(),
        department,
        teacher: teacher || null,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">
              {classData ? "Edit Class" : "Add Class"}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {classData ? "Update class details" : "Create a new class"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="p-2 rounded-lg hover:bg-slate-800 transition text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error */}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Class Name */}

          <div>
            <label className="text-sm text-slate-300">Class Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. BCA First Year"
              disabled={saving}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          {/* Department */}

          <div>
            <label className="text-sm text-slate-300">Department</label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={loadingData || saving}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">Select Department</option>

              {departments.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}

          <div>
            <label className="text-sm text-slate-300">
              Teacher
              <span className="text-slate-500 ml-1">(Optional)</span>
            </label>

            <select
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              disabled={loadingData || saving}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">No Teacher Assigned</option>

              {teachers.map((item) => (
                <option key={item._id} value={item._id}>
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
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : classData ? (
                "Update Class"
              ) : (
                "Create Class"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassModal;
