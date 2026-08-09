# 🎓 College Management System

A full-stack College Management System built with the MERN stack. The application provides separate dashboards and role-based access for Admins and Teachers to manage departments, students, classes, teachers, courses, and student attendance.

## 🌐 Live Demo ->
https://collegemsbymd.netlify.app

---

# 📌 Features

## 🔐 Authentication & Authorization

- Admin login
- Teacher login
- Secure password hashing using bcrypt
- JWT-based authentication
- HTTP-only cookies for authentication
- Role-based authorization
- Protected Admin routes
- Protected Teacher routes
- Automatic user session verification
- Logout functionality
- Production-ready CORS and cookie configuration

---

# 👨‍💼 Admin Features

Admin has complete management access to the college system.

### Dashboard

Admin dashboard provides an overview of:

- Total Students
- Total Teachers
- Total Departments
- Total Courses

Dashboard data is fetched from the backend.

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
- Filter students by Roll Number

Student information includes:

- Name
- Email
- Roll Number
- Department
- Class

### Teacher Management

Admin can:

- Create teachers
- View teachers
- Edit teachers
- Delete teachers
- Assign teachers to departments
- Assign teachers to classes
- Update teacher credentials

Teacher passwords are securely hashed before being stored in the database.

### Class Management

Admin can:

- Create classes
- View classes
- Edit classes
- Delete classes
- Assign departments to classes
- Assign teachers to classes

### Course Management

Admin can:

- Create courses
- View courses
- Edit courses
- Delete courses

---

# 👨‍🏫 Teacher Features

Teachers have their own dashboard with restricted access.

## Teacher Dashboard

Teachers can view:

- Teacher name
- Assigned department
- Assigned classes
- Number of assigned classes
- List of assigned classes

Teachers only receive data related to their own account.

## Attendance Management

Teachers can take daily attendance for their assigned classes.

Attendance statuses:

- Present
- Absent
- Late

### Attendance Features

- Select assigned class
- Select attendance date
- View students belonging to selected class
- Mark Present
- Mark Absent
- Mark Late
- Save attendance
- Update previously saved attendance
- View past attendance records
- View attendance by class
- View attendance by date
- See which teacher marked the attendance

Each class contains 10 students as required by the project specification.

---

# 🛡️ Role-Based Access Control

The application uses role-based access control.

Supported roles:

```text
admin
teacher
