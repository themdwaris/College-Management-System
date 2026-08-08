import api from "./api";

export const getDepartments = async () => {
  const { data } = await api.get("/departments");
  return data;
};

export const createDepartment = async (department) => {
  const { data } = await api.post("/departments", department);
  return data;
};

export const updateDepartment = async (id, department) => {
  const { data } = await api.put(`/departments/${id}`, department);
  return data;
};

export const deleteDepartment = async (id) => {
  const { data } = await api.delete(`/departments/${id}`);
  return data;
};