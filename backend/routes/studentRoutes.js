import express from "express";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByClass,
} from "../controllers/studentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getStudents).post(protect, adminOnly, createStudent);

router.get("/class/:classId", protect, getStudentsByClass);

router
  .route("/:id")
  .put(protect, adminOnly, updateStudent)
  .delete(protect, adminOnly, deleteStudent);

export default router;
