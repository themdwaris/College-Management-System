import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Department from "../models/Department.js";
import Course from "../models/Course.js";

const getAdminDashboard = async (req, res) => {
  try {
    const [
      studentsCount,
      teachersCount,
      departmentsCount,
      coursesCount,
    ] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Department.countDocuments(),
      Course.countDocuments(),
    ]);

    res.status(200).json({
      students: studentsCount,
      teachers: teachersCount,
      departments: departmentsCount,
      courses: coursesCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { getAdminDashboard };