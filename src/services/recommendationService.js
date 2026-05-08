import api from "../api/axios";

export const generateRecommendation = async (
  payload
) => {

  const response = await api.post(
    "/api/recommendations",
    payload
  );

  return response.data;
};