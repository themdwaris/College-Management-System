import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";

// ==========================
// Mark Attendance
// ==========================

const markAttendance = async (req, res) => {
  try {
    const { classId, date, attendance } = req.body;

    if (!classId || !date || !attendance) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check class exists
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    // Teacher can only mark attendance
    // for their assigned class
    if (classData.teacher?.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not assigned to this class",
      });
    }

    // Check every student
    for (const student of attendance) {
      const studentData = await Student.findById(
        student.studentId
      );

      if (!studentData) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      // Student belongs to selected class?
      if (
        studentData.classId?.toString() !== classId
      ) {
        return res.status(400).json({
          message: "Student does not belong to this class",
        });
      }

      // Create or update attendance
      await Attendance.findOneAndUpdate(
        {
          student: student.studentId,
          classId,
          date,
        },
        {
          teacher: req.user.id,
          status: student.status,
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    res.status(201).json({
      message: "Attendance marked successfully",
    });
  } catch (error) {
    console.log("MARK ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Attendance By Class
// ==========================

const getAttendanceByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date } = req.query;

    // Check class exists
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    // Teacher can only view
    // attendance of their assigned class
    if (classData.teacher?.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not assigned to this class",
      });
    }

    const filter = {
      classId,
    };

    // Optional date filter
    if (date) {
      filter.date = date;
    }

    const attendance = await Attendance.find(filter)
      .populate("student", "name rollNumber")
      .populate("teacher", "name")
      .sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    console.log("GET ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  markAttendance,
  getAttendanceByClass,
};