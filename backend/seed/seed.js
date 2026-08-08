import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";

const seedDatabase = async () => {
  try {

    // Admin

    const adminExists = await Admin.findOne({
      email: "admin@college.com",
    });

    if (!adminExists) {

      const hashedPassword = await bcrypt.hash(
        "admin123",
        10
      );

      await Admin.create({
        email: "admin@college.com",
        password: hashedPassword,
      });

      console.log("Admin Created");
    }

    // Teachers

    const teacherCount = await Teacher.countDocuments();

    if (teacherCount === 0) {

      const password = await bcrypt.hash(
        "teacher123",
        10
      );

      await Teacher.insertMany([
        {
          name: "Rahul Sharma",
          email: "rahul@college.com",
          password,
        },
        {
          name: "Amit Kumar",
          email: "amit@college.com",
          password,
        },
      ]);

      console.log("Teachers Created");
    }

  } catch (error) {

    console.log(error.message);

  }
};

export default seedDatabase;