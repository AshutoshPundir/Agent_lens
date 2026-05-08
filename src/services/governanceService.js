import api from "../api/axios";

export const validateWorkflow = async (
  payload
) => {

  const response = await api.post(
    "/api/workflows/validate",
    payload
  );

  return response.data;
};

export const simulatePolicy = async (
  payload
) => {

  const response = await api.post(
    "/api/workflows/simulate-policy",
    payload
  );

  return response.data;
};