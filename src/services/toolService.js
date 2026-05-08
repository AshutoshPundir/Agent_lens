import api from "../api/axios";

export const getAllTools = async () => {

  const response = await api.get(
    "/api/tools"
  );

  return response.data;
};

export const getToolsByCategory =
  async (category) => {

    const response = await api.get(
      `/api/tools/category/${category}`
    );

    return response.data;
};

export const compareTools = async (
  payload
) => {

  const response = await api.post(
    "/api/tools/compare",
    payload
  );

  return response.data;
};