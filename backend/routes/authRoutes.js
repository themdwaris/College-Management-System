



import express from "express";

import {
  adminLogin,
  teacherLogin,
  logout,
  getMe,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Admin Login
router.post("/admin/login", adminLogin);


// Teacher Login
router.post("/teacher/login", teacherLogin);


// Current Logged-in User
router.get("/me", protect, getMe);


// Logout
router.post("/logout", logout);


export default router;