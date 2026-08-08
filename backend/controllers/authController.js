import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";

import generateToken from "../utils/generateToken.js";

// ==========================
// Admin Login
// ==========================

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(admin._id, "admin");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Success",

      admin: {
        id: admin._id,
        name: admin.name || "Admin",
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Teacher Login
// ==========================

const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(teacher._id, "teacher");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Success",

      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: "teacher",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Current User
// ==========================

const getMe = async (req, res) => {
  try {
    // Admin
    if (req.user.role === "admin") {
      const admin = await Admin.findById(req.user.id).select("-password");

      if (!admin) {
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      return res.status(200).json({
        user: {
          id: admin._id,
          name: admin.name || "Admin",
          email: admin.email,
          role: "admin",
        },
      });
    }

    // Teacher
    if (req.user.role === "teacher") {
      const teacher = await Teacher.findById(req.user.id).select("-password");

      if (!teacher) {
        return res.status(404).json({
          message: "Teacher not found",
        });
      }

      return res.status(200).json({
        user: {
          id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          role: "teacher",
        },
      });
    }

    return res.status(403).json({
      message: "Invalid role",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Logout
// ==========================

// const logout = (req, res) => {
//   res.clearCookie("token");

//   res.status(200).json({
//     message: "Logout Successfully",
//   });
// };

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  });

  res.status(200).json({
    message: "Logout Successfully",
  });
};

export { adminLogin, teacherLogin, getMe, logout };
