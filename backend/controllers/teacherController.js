import bcrypt from "bcryptjs";
import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";
import Student from "../models/Student.js";


// GET ALL TEACHERS
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .select("-password")
      .populate("department", "name");

    res.status(200).json(teachers);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET TEACHER BY ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .select("-password")
      .populate("department", "name");

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json(teacher);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// CREATE TEACHER
const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
    } = req.body;

    if (!name || !email || !password || !department) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check email
    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(400).json({
        message: "Teacher email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      department,
    });

    const teacherResponse = await Teacher.findById(teacher._id)
      .select("-password")
      .populate("department", "name");

    res.status(201).json(teacherResponse);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TEACHER
const updateTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
    } = req.body;

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    teacher.name = name;
    teacher.email = email;
    teacher.department = department;

    // Password sirf tab update hoga
    // jab frontend se new password aaye
    if (password) {
      teacher.password = await bcrypt.hash(password, 10);
    }

    await teacher.save();

    const teacherResponse = await Teacher.findById(
      teacher._id
    )
      .select("-password")
      .populate("department", "name");

    res.status(200).json(teacherResponse);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TEACHER
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(
      req.params.id
    );

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    await Teacher.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Teacher deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getMyTeacherDashboard = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id)
      .select("-password")
      .populate("department", "name");

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    const classes = await Class.find({
      teacher: teacher._id,
    }).populate("department", "name");

    const classesWithStudents = await Promise.all(
      classes.map(async (classData) => {
        const students = await Student.find({
          classId: classData._id,
        }).select("name rollNumber");

        return {
          ...classData.toObject(),
          students,
        };
      })
    );

    res.status(200).json({
      teacher,
      department: teacher.department,
      classes: classesWithStudents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getMyClasses = async (req, res) => {
  try {
    const classes = await Class.find({
      teacher: req.user.id,
    }).populate("department", "name");

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getMyTeacherDashboard,
  getMyClasses
};