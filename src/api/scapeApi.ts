/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiConfig";

// addScapeObject
// deleteScapeObject
// getScapeObjects
// addActivityToScape
// removeActivityFromScape
// getActivitiesWithActivityPopulated

export const ScapeApi = {
  create: async (body: any) => {
    const response = await api.post("/scape", body);
    return response.data;
  },
  getYourScapes: async () => {
    const response = await api.get("/scape");
    return response.data;
  },
  getScapeById: async (id: string) => {
    const response = await api.get(`/scape/${id}`);
    return response.data;
  },

  addRealObjectToScape: async (scapeId: string, body: any) => {
    const response = await api.post(`/scape/${scapeId}/real-object`, body);
    return response.data;
  },

  removeObjectFromScape: async (scapeId: string, objectId: string) => {
    const response = await api.delete(
      `/scape/${scapeId}/real-object/${objectId}`
    );
    return response.data;
  },

  deleteScape: async (id: string) => {
    const response = await api.delete(`/scape/${id}`);
    return response.data;
  },

  addActivityToScape: async (scapeId: string, body: any) => {
    const response = await api.post(`/scape/${scapeId}/activity`, body);
    return response.data;
  },

  removeActivityFromScape: async (scapeId: string, activityId: string) => {
    const response = await api.delete(
      `/scape/${scapeId}/activity/${activityId}`
    );
    return response.data;
  },

  addScapeObject: async (scapeId: string, body: any) => {
    const response = await api.post(`/scape/${scapeId}/scape-object`, body);
    return response.data;
  },

  deleteScapeObject: async (scapeId: string, objectId: string) => {
    const response = await api.delete(
      `/scape/${scapeId}/scape-object/${objectId}`
    );
    return response.data;
  },

  getScapeObjects: async (scapeId: string) => {
    const response = await api.get(`/scape/${scapeId}/scape-object`);
    return response.data;
  },

  pinItemToScape: async (scapeId: string, body: any) => {
    const response = await api.post(`/scape/${scapeId}/pin`, body);
    return response.data;
  },
};
