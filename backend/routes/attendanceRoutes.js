import express from "express";

import {
  markAttendance,
  getAttendanceByClass,
} from "../controllers/attendanceController.js";

import { protect, teacherOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, teacherOnly, markAttendance);

router.get(
  "/class/:classId",
  protect,
  teacherOnly,
  getAttendanceByClass
);

export default router;