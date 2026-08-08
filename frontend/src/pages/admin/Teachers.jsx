import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import TeacherModal from "../../components/TeacherModal";

import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../services/teacherService";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);



const fetchTeachers = async () => {
  try {
    const data = await getTeachers();
    setTeachers(data);
  } catch (error) {
    console.log("TEACHERS ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
  }
};

  // Add / Update Teacher
  const handleSave = async (teacherData) => {
    try {
      if (selectedTeacher) {
        await updateTeacher(
          selectedTeacher._id,
          teacherData
        );
      } else {
        await createTeacher(teacherData);
      }

      await fetchTeachers();

      setIsOpen(false);
      setSelectedTeacher(null);

    } catch (error) {
      console.log(error);

      // Modal ka loader stop karne ke liye
      throw error;
    }
  };

  // Delete Teacher
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTeacher(id);

      await fetchTeachers();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Teachers
          </h1>

          <p className="text-slate-400 mt-1 text-sm">
            Manage college teachers
          </p>
        </div>

        {/* Add Teacher */}
        <button
          onClick={() => {
            setSelectedTeacher(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium"
        >
          <Plus size={18} />

          Add Teacher
        </button>

      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px] whitespace-nowrap">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left p-4 text-slate-300">
                  Name
                </th>

                <th className="text-left p-4 text-slate-300">
                  Email
                </th>

                <th className="text-left p-4 text-slate-300">
                  Department
                </th>

                <th className="text-left p-4 text-slate-300">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {teachers.map((teacher) => (

                <tr
                  key={teacher._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4 text-white">
                    {teacher.name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {teacher.email}
                  </td>

                  <td className="p-4 text-slate-300">
                    {teacher.department?.name || "N/A"}
                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setIsOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-slate-800 transition"
                      >
                        <Pencil
                          size={18}
                          className="text-yellow-400"
                        />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(teacher._id)
                        }
                        className="p-2 rounded-lg hover:bg-slate-800 transition"
                      >
                        <Trash2
                          size={18}
                          className="text-red-500"
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

              {teachers.length === 0 && (
                <tr>

                  <td
                    colSpan="4"
                    className="p-8 text-center text-slate-500"
                  >
                    No teachers found
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Teacher Modal */}
      <TeacherModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedTeacher(null);
        }}
        onSave={handleSave}
        teacher={selectedTeacher}
      />

    </div>
  );
};

export default Teachers;