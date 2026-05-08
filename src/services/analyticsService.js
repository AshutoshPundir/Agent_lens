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

export const getSpendAnalytics = async (
  payload
) => {

  const response = await api.post(
    "/api/analytics/spend",
    payload
  );

  return response.data;
};

export const getOptimizationInsights =
  async () => {

    const response = await api.get(
      "/api/analytics/optimization"
    );

    return response.data;
};

export const getTeamAnalytics =
  async (teamName) => {

    const response = await api.get(
      `/api/analytics/team/${teamName}`
    );

    return response.data;
};