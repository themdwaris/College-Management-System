// import api from "./api";

// // Get attendance of a class
// export const getAttendanceByClass = async (
//   classId,
//   date
// ) => {
//   const { data } = await api.get(
//     `/attendance/class/${classId}`,
//     {
//       params: {
//         date,
//       },
//     }
//   );

//   return data;
// };

// // Mark / Update attendance
// export const markAttendance = async (
//   attendanceData
// ) => {
//   const { data } = await api.post(
//     "/attendance",
//     attendanceData
//   );

//   return data;
// };


import api from "./api";

export const markAttendance = async (data) => {
  const response = await api.post("/attendance", data);

  return response.data;
};

export const getAttendanceByClass = async (
  classId,
  date
) => {
  const response = await api.get(
    `/attendance/class/${classId}`,
    {
      params: date ? { date } : {},
    }
  );

  return response.data;
};