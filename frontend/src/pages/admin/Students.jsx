import { useEffect, useState } from "react";

import { Plus, Pencil, Trash2, Search } from "lucide-react";

import StudentModal from "../../components/StudentModal";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/studentService";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  // Search state
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Save Student
  // ==========================

  const handleSave = async (student) => {
    try {
      if (selectedStudent) {
        await updateStudent(
          selectedStudent._id,
          student
        );
      } else {
        await createStudent(student);
      }

      await fetchStudents();

      setIsOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  // ==========================
  // Delete Student
  // ==========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      await fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Search Filter
  // ==========================

  const filteredStudents = students.filter((student) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) return true;

    const name = student.name?.toLowerCase() || "";
    const rollNumber =
      student.rollNumber?.toString().toLowerCase() || "";

    return (
      name.includes(searchValue) ||
      rollNumber.includes(searchValue)
    );
  });

  return (
    <div>
      {/* ==========================
          Header
      ========================== */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <h1 className="text-3xl font-bold text-white">
          Students
        </h1>

        <button
          onClick={() => {
            setSelectedStudent(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-white"
        >
          <Plus size={18} />

          Add Student
        </button>

      </div>

      {/* ==========================
          Search
      ========================== */}

      <div className="mb-5">

        <div className="relative max-w-md">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by name or roll no..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />

        </div>

      </div>

      {/* ==========================
          Students Table
      ========================== */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px] whitespace-nowrap">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Roll No
                </th>

                <th className="text-left p-4">
                  Department
                </th>

                <th className="text-left p-4">
                  Class
                </th>

                <th className="text-left p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="p-10 text-center text-slate-500"
                  >
                    {search
                      ? "No students found."
                      : "No students available."}
                  </td>

                </tr>

              ) : (

                filteredStudents.map((student) => (

                  <tr
                    key={student._id}
                    className="border-t border-slate-800 hover:bg-slate-800/50"
                  >

                    <td className="p-4 text-white">
                      {student.name}
                    </td>

                    <td className="p-4 text-slate-300">
                      {student.email}
                    </td>

                    <td className="p-4 text-slate-300">
                      {student.rollNumber}
                    </td>

                    <td className="p-4 text-slate-300">
                      {student.department?.name || "N/A"}
                    </td>

                    <td className="p-4 text-slate-300">
                      {student.classId?.name || "N/A"}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-3">

                        {/* Edit */}

                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setIsOpen(true);
                          }}
                        >
                          <Pencil
                            size={18}
                            className="text-yellow-400 hover:text-yellow-300"
                          />
                        </button>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            handleDelete(student._id)
                          }
                        >
                          <Trash2
                            size={18}
                            className="text-red-500 hover:text-red-400"
                          />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================
          Student Modal
      ========================== */}

      <StudentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedStudent(null);
        }}
        onSave={handleSave}
        student={selectedStudent}
      />

    </div>
  );
};

export default Students;