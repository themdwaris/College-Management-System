# College Management System

A full-stack College Management System built with the MERN stack.

The application provides separate dashboards for Admin and Teachers, allowing college data, classes, students, teachers, courses, and attendance to be managed from a centralized system.

---

## 🚀 Live Demo

### Frontend
https://collegemsbymd.netlify.app

## 📌 Features

### 🔐 Authentication & Authorization

- Admin login
- Teacher login
- Cookie-based authentication
- HTTP-only authentication cookies
- Role-based authorization
- Protected routes
- Separate Admin and Teacher dashboards
- Secure logout
- Persistent login after page refresh

---

## 👨‍💼 Admin Features

Admin has complete control over the college management system.

### Dashboard

- Total Students
- Total Teachers
- Total Departments
- Total Courses

Dashboard statistics are fetched dynamically from the backend.

### Department Management

Admin can:

- Create departments
- View departments
- Edit departments
- Delete departments

### Student Management

Admin can:

- Add students
- View students
- Edit students
- Delete students
- Assign students to departments
- Assign students to classes
- Search students
- Filter students by roll number
- View student class and department

### Teacher Management

Admin can:

- Add teachers
- View teachers
- Edit teachers
- Delete teachers
- Assign teachers to departments
- Assign classes to teachers

### Class Management

Admin can:

- Create classes
- View classes
- Edit classes
- Delete classes
- Assign classes to departments
- Assign teachers to classes

### Course Management

Admin can:

- Create courses
- View courses
- Edit courses
- Delete courses

---

## 👨‍🏫 Teacher Features

Teachers have their own dashboard and can only access their assigned resources.

### Teacher Dashboard

Displays:

- Teacher name
- Department
- Number of assigned classes
- Assigned classes
- Department information

### Attendance Management

Teachers can:

- View only their assigned classes
- Select a class
- Select attendance date
- View students belonging to the selected class
- Mark students as:
  - Present
  - Absent
  - Late
- Save attendance
- Update attendance for an existing date
- View previous attendance records
- See which teacher marked attendance

Teachers cannot mark attendance for classes that are not assigned to them.

---

## 🔒 Role-Based Access Control

The application uses role-based authorization.

### Admin

Admin can access:

- Admin Dashboard
- Departments
- Students
- Teachers
- Classes
- Courses

### Teacher

Teacher can access:

- Teacher Dashboard
- Attendance

Teachers cannot access Admin-only APIs or pages.

Backend authorization is also implemented, so frontend route protection alone is not relied upon for security.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token
- Cookie Parser
- CORS
- dotenv

### Database

- MongoDB

### Deployment

- Netlify - Frontend
- Render - Backend
- MongoDB Atlas - Database

---

## 📂 Project Structure

```text
CollegeMS/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── teacher/
│   │   ├── services/
│   │   ├── layouts/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   │   └── _redirects
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── attendanceController.js
│   │   ├── classController.js
│   │   ├── courseController.js
│   │   ├── departmentController.js
│   │   ├── studentController.js
│   │   └── teacherController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Attendance.js
│   │   ├── Class.js
│   │   ├── Course.js
│   │   ├── Department.js
│   │   ├── Student.js
│   │   └── Teacher.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── authRoutes.js
│   │   ├── classRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── departmentRoutes.js
│   │   ├── studentRoutes.js
│   │   └── teacherRoutes.js
│   │
│   ├── seed/
│   │   └── seed.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
