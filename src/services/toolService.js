import api from "../api/axios";

export const getAllTools = async () => {
  const res = await api.get("/api/tools/");
  return res.data;
};