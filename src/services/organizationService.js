import api from "../api/axios";

export const createOrganization =
  async (payload) => {

    const response = await api.post(
      "/api/organizations",
      payload
    );

    return response.data;
};

export const getOrganizations =
  async () => {

    const response = await api.get(
      "/api/organizations"
    );

    return response.data;
};