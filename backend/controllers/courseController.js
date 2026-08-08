import Course from "../models/Course.js";
import Department from "../models/Department.js";
import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";

// ==========================
// Get All Courses
// ==========================

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("department", "name")
      .populate("teacher", "name")
      .populate("classId", "name");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Course By ID
// ==========================

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("department", "name")
      .populate("teacher", "name")
      .populate("classId", "name");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Create Course
// ==========================

const createCourse = async (req, res) => {
  try {
    const {
      name,
      department,
      teacher,
      classId,
    } = req.body;

    // Required fields
    if (!name || !department) {
      return res.status(400).json({
        message: "Course name and department are required",
      });
    }

    // Check Department
    const departmentExists =
      await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    // Check Teacher if provided
    if (teacher) {
      const teacherExists =
        await Teacher.findById(teacher);

      if (!teacherExists) {
        return res.status(404).json({
          message: "Teacher not found",
        });
      }
    }

    // Check Class if provided
    if (classId) {
      const classExists =
        await Class.findById(classId);

      if (!classExists) {
        return res.status(404).json({
          message: "Class not found",
        });
      }
    }

    // Create Course
    const course = await Course.create({
      name,
      department,
      teacher: teacher || null,
      classId: classId || null,
    });

    const populatedCourse =
      await Course.findById(course._id)
        .populate("department", "name")
        .populate("teacher", "name")
        .populate("classId", "name");

    res.status(201).json(populatedCourse);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Course
// ==========================

const updateCourse = async (req, res) => {
  try {
    const {
      name,
      department,
      teacher,
      classId,
    } = req.body;

    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Check Department if provided
    if (department) {
      const departmentExists =
        await Department.findById(department);

      if (!departmentExists) {
        return res.status(404).json({
          message: "Department not found",
        });
      }

      course.department = department;
    }

    // Check Teacher if provided
    if (teacher) {
      const teacherExists =
        await Teacher.findById(teacher);

      if (!teacherExists) {
        return res.status(404).json({
          message: "Teacher not found",
        });
      }

      course.teacher = teacher;
    } else if (teacher === null || teacher === "") {
      course.teacher = null;
    }

    // Check Class if provided
    if (classId) {
      const classExists =
        await Class.findById(classId);

      if (!classExists) {
        return res.status(404).json({
          message: "Class not found",
        });
      }

      course.classId = classId;
    } else if (classId === null || classId === "") {
      course.classId = null;
    }

    // Update name
    if (name) {
      course.name = name;
    }

    await course.save();

    const updatedCourse =
      await Course.findById(course._id)
        .populate("department", "name")
        .populate("teacher", "name")
        .populate("classId", "name");

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Course
// ==========================

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};