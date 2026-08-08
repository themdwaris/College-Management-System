import Student from "../models/Student.js";
import Class from "../models/Class.js";
import Department from "../models/Department.js";

// ======================
// Get All Students
// ======================

const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("department", "name")
      .populate("classId", "name");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStudentsByClass = async (req, res) => {
  try {
    const students = await Student.find({
      classId: req.params.classId,
    }).select("name rollNumber email");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Create Student
// ======================

const createStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, department, classId } = req.body;

    if (!name || !rollNumber || !email || !department || !classId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const departmentExists = await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    // Check Class Exists
    const classExists = await Class.findById(classId);

    if (!classExists) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    // Check Roll Number
    const rollExists = await Student.findOne({ rollNumber });

    if (rollExists) {
      return res.status(400).json({
        message: "Roll Number already exists",
      });
    }

    // Check Email
    const emailExists = await Student.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Maximum 10 Students Per Class
    const totalStudents = await Student.countDocuments({ classId });

    if (totalStudents >= 10) {
      return res.status(400).json({
        message: "Class is full. Maximum 10 students allowed.",
      });
    }

    const student = await Student.create({
      name,
      rollNumber,
      email,
      department,
      classId,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Update Student
// ======================

const updateStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, classId } = req.body;

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Roll Number Duplicate Check
    if (rollNumber && rollNumber !== student.rollNumber) {
      const rollExists = await Student.findOne({ rollNumber });

      if (rollExists) {
        return res.status(400).json({
          message: "Roll Number already exists",
        });
      }
    }

    // Email Duplicate Check
    if (email && email !== student.email) {
      const emailExists = await Student.findOne({ email });

      if (emailExists) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    // Class Validation
    if (classId && classId !== student.classId.toString()) {
      const classExists = await Class.findById(classId);

      if (!classExists) {
        return res.status(404).json({
          message: "Class not found",
        });
      }

      const totalStudents = await Student.countDocuments({ classId });

      if (totalStudents >= 10) {
        return res.status(400).json({
          message: "Class is full. Maximum 10 students allowed.",
        });
      }

      student.classId = classId;
    }

    student.name = name || student.name;
    student.rollNumber = rollNumber || student.rollNumber;
    student.email = email || student.email;

    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Delete Student
// ======================

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await student.deleteOne();

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { getStudents,getStudentsByClass, createStudent, updateStudent, deleteStudent };
