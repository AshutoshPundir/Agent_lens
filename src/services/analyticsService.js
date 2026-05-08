import api from "../api/axios";

export const getExecutiveAnalytics = async () => {
  const response = await api.get(
    "/api/analytics/executive"
  );

  return response.data;
};

export const getUsageAnalytics = async () => {
  const response = await api.get(
    "/api/analytics/usage"
  );

  return response.data;
};

export const getCarbonAnalytics = async () => {
  const response = await api.get(
    "/api/analytics/carbon"
  );

  return response.data;
};