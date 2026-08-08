import express from "express";

import {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getMyTeacherDashboard,
  getMyClasses,
} from "../controllers/teacherController.js";

import {
  protect,
  adminOnly,
  teacherOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Teacher Dashboard
// ==========================

router.get(
  "/me/dashboard",
  protect,
  teacherOnly,
  getMyTeacherDashboard
);

// ==========================
// Admin Teacher Management
// ==========================

// Get all teachers
router.get(
  "/",
  protect,
  adminOnly,
  getTeachers
);
router.get(
  "/my-classes",
  protect,
  teacherOnly,
  getMyClasses
);

// Get teacher by ID
router.get(
  "/:id",
  protect,
  adminOnly,
  getTeacherById
);

// Create teacher
router.post(
  "/",
  protect,
  adminOnly,
  createTeacher
);

// Update teacher
router.put(
  "/:id",
  protect,
  adminOnly,
  updateTeacher
);

// Delete teacher
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTeacher
);



export default router;