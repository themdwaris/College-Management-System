import express from "express";

import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  getMyClasses,
} from "../controllers/classController.js";

import {
  protect,
  adminOnly,
  teacherOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getClasses)
  .post(protect, adminOnly, createClass);

router
  .route("/:id")
  .put(protect, adminOnly, updateClass)
  .delete(protect, adminOnly, deleteClass);

  router.get(
  "/my-classes",
  protect,
  teacherOnly,
  getMyClasses
);

export default router;