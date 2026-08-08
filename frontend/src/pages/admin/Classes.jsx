// import { useEffect, useState } from "react";
// import { Plus, Pencil, Trash2 } from "lucide-react";

// import ClassModal from "../../components/ClassModal";

// import {
//   getClasses,
//   createClass,
//   updateClass,
//   deleteClass,
// } from "../../services/classService";

// const Classes = () => {
//   const [classes, setClasses] = useState([]);

//   const [isOpen, setIsOpen] = useState(false);

//   const [selectedClass, setSelectedClass] = useState(null);

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const data = await getClasses();

//       setClasses(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Add / Update
//   const handleSave = async (classData) => {
//     try {
//       if (selectedClass) {
//         await updateClass(
//           selectedClass._id,
//           classData
//         );
//       } else {
//         await createClass(classData);
//       }

//       await fetchClasses();

//       setIsOpen(false);
//       setSelectedClass(null);

//     } catch (error) {
//       console.log(error);

//       throw error;
//     }
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Delete this class?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteClass(id);

//       await fetchClasses();

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-white">
//             Classes
//           </h1>

//           <p className="text-slate-400 mt-1 text-sm">
//             Manage college classes
//           </p>
//         </div>

//         <button
//           onClick={() => {
//             setSelectedClass(null);
//             setIsOpen(true);
//           }}
//           className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium"
//         >
//           <Plus size={18} />

//           Add Class
//         </button>

//       </div>

//       {/* Table */}
//       <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[700px] whitespace-nowrap">

//             <thead className="bg-slate-800">

//               <tr>

//                 <th className="text-left p-4 text-slate-300">
//                   Class Name
//                 </th>

//                 <th className="text-left p-4 text-slate-300">
//                   Department
//                 </th>

//                 <th className="text-left p-4 text-slate-300">
//                   Actions
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {classes.map((item) => (

//                 <tr
//                   key={item._id}
//                   className="border-t border-slate-800 hover:bg-slate-800/40 transition"
//                 >

//                   <td className="p-4 text-white">
//                     {item.name}
//                   </td>

//                   <td className="p-4 text-slate-300">
//                     {item.department?.name || "N/A"}
//                   </td>

//                   <td className="p-4">

//                     <div className="flex items-center gap-3">

//                       {/* Edit */}
//                       <button
//                         onClick={() => {
//                           setSelectedClass(item);
//                           setIsOpen(true);
//                         }}
//                         className="p-2 rounded-lg hover:bg-slate-800 transition"
//                       >
//                         <Pencil
//                           size={18}
//                           className="text-yellow-400"
//                         />
//                       </button>

//                       {/* Delete */}
//                       <button
//                         onClick={() =>
//                           handleDelete(item._id)
//                         }
//                         className="p-2 rounded-lg hover:bg-slate-800 transition"
//                       >
//                         <Trash2
//                           size={18}
//                           className="text-red-500"
//                         />
//                       </button>

//                     </div>

//                   </td>

//                 </tr>

//               ))}

//               {classes.length === 0 && (
//                 <tr>

//                   <td
//                     colSpan="3"
//                     className="p-8 text-center text-slate-500"
//                   >
//                     No classes found
//                   </td>

//                 </tr>
//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//       {/* Modal */}
//       <ClassModal
//         isOpen={isOpen}
//         onClose={() => {
//           setIsOpen(false);
//           setSelectedClass(null);
//         }}
//         onSave={handleSave}
//         classData={selectedClass}
//       />

//     </div>
//   );
// };

// export default Classes;

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../../services/classService";
import ClassModal from "../../components/ClassModal";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await getClasses();

      setClasses(data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this class?");

    if (!confirmDelete) return;

    try {
      await deleteClass(id);

      await fetchClasses();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const handleSave = async (classData) => {
    if (selectedClass) {
      await updateClass(selectedClass._id, classData);
    } else {
      await createClass(classData);
    }

    await fetchClasses();

    setIsOpen(false);
    setSelectedClass(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Classes</h1>

          <p className="text-slate-400 mt-1 text-sm">Manage college classes</p>
        </div>

        <button
          onClick={() => {
            setSelectedClass(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium"
        >
          <Plus size={18} />
          Add Class
        </button>
      </div>

      {/* Table */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] whitespace-nowrap">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4 text-slate-300">Class Name</th>

                <th className="text-left p-4 text-slate-300">Department</th>

                <th className="text-left p-4 text-slate-300">Teacher</th>

                <th className="text-left p-4 text-slate-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="p-4 text-white">{item.name}</td>

                  <td className="p-4 text-slate-300">
                    {item.department?.name || "N/A"}
                  </td>

                  <td className="p-4 text-slate-300">
                    {item.teacher?.name || "Not Assigned"}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedClass(item);
                          setIsOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-slate-800 transition"
                      >
                        <Pencil size={18} className="text-yellow-400" />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg hover:bg-slate-800 transition"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {classes.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    No classes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ClassModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedClass(null);
        }}
        onSave={handleSave}
        classData={selectedClass}
      />
    </div>
  );
};

export default Classes;
