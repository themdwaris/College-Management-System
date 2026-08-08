import Class from "../models/Class.js";
import Department from "../models/Department.js";
import Teacher from "../models/Teacher.js";

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("department", "name")
      .populate("teacher", "name email");

    res.json(classes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createClass = async (req, res) => {
  try {
    const { name, department, teacher } = req.body;

    if (!name || !department) {
      return res.status(400).json({
        message: "Name and Department are required",
      });
    }

    const departmentExists = await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    if (teacher) {
      const teacherExists = await Teacher.findById(teacher);

      if (!teacherExists) {
        return res.status(404).json({
          message: "Teacher not found",
        });
      }
    }

    const newClass = await Class.create({
      name,
      department,
      teacher: teacher || null,
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const { name, department, teacher } = req.body;

    const classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    if (department) {
      const departmentExists = await Department.findById(department);

      if (!departmentExists) {
        return res.status(404).json({
          message: "Department not found",
        });
      }
    }

    if (teacher) {
      const teacherExists = await Teacher.findById(teacher);

      if (!teacherExists) {
        return res.status(404).json({
          message: "Teacher not found",
        });
      }
    }

    classData.name = name || classData.name;
    classData.department = department || classData.department;
    classData.teacher = teacher || classData.teacher;

    await classData.save();

    res.json(classData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    await classData.deleteOne();

    res.json({
      message: "Class deleted successfully",
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
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  getMyClasses
};