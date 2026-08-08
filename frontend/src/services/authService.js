import api from "./api";


// ==========================
// Admin Login
// ==========================

export const adminLogin = async (loginData) => {
  const { data } = await api.post(
    "/auth/admin/login",
    loginData
  );

  return data;
};


// ==========================
// Teacher Login
// ==========================

export const teacherLogin = async (loginData) => {
  const { data } = await api.post(
    "/auth/teacher/login",
    loginData
  );

  return data;
};


// ==========================
// Get Current Logged-in User
// ==========================

export const getMe = async () => {
  const { data } = await api.get("/auth/me");

  return data.user;
};


// ==========================
// Logout
// ==========================

export const logout = async () => {
  const { data } = await api.post("/auth/logout");

  return data;
};