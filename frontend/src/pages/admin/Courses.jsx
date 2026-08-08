import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseService";

import CourseModal from "../../components/CourseModal";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] =
    useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();

      setCourses(data);
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  const handleSave = async (courseData) => {
    try {
      if (selectedCourse) {
        await updateCourse(
          selectedCourse._id,
          courseData
        );
      } else {
        await createCourse(courseData);
      }

      await fetchCourses();

      setIsOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCourse(id);

      await fetchCourses();
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Courses
          </h1>

          <p className="text-slate-400 mt-1 text-sm">
            Manage college courses
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCourse(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium"
        >
          <Plus size={18} />
          Add Course
        </button>

      </div>

      {/* Table */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px] whitespace-nowrap">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left p-4 text-slate-300">
                  Course Name
                </th>

                <th className="text-left p-4 text-slate-300">
                  Department
                </th>

                <th className="text-left p-4 text-slate-300">
                  Teacher
                </th>

                <th className="text-left p-4 text-slate-300">
                  Class
                </th>

                <th className="text-left p-4 text-slate-300">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4 text-white font-medium">
                    {course.name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {course.department?.name ||
                      "N/A"}
                  </td>

                  <td className="p-4 text-slate-300">
                    {course.teacher?.name ||
                      "Not Assigned"}
                  </td>

                  <td className="p-4 text-slate-300">
                    {course.classId?.name ||
                      "Not Assigned"}
                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-slate-800 transition"
                      >
                        <Pencil
                          size={18}
                          className="text-yellow-400"
                        />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(course._id)
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

              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-slate-500"
                  >
                    No courses found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* Modal */}

      <CourseModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedCourse(null);
        }}
        onSave={handleSave}
        course={selectedCourse}
      />

    </div>
  );
};

export default Courses;