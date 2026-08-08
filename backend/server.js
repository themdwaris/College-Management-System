import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import seedDatabase from "./seed/seed.js";
import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";



dotenv.config();

const startServer = async () => {

  await connectDB();

  await seedDatabase();

  const app = express();

//   app.use(cors());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL||"http://localhost:5173",
    credentials: true,
  })
);



  app.use(express.json());


  app.get("/", (req, res) => {
    res.send("College Management API Running");
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/departments", departmentRoutes);
  app.use("/api/classes", classRoutes);
  app.use("/api/students", studentRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/teachers", teacherRoutes);
  app.use("/api/attendance",attendanceRoutes );
  app.use("/api/admin", adminRoutes);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server Running On ${PORT}`);
  });

};

startServer();