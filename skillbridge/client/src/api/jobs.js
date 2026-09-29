import { apiClient } from "./client";
import { localMockStore } from "../mocks/mockStore";

export async function getJobs() {
  try {
    return await apiClient.get("/api/jobs");
  } catch (err) {
    return localMockStore.getJobs();
  }
}

export async function getJobById(id) {
  try {
    return await apiClient.get(`/api/jobs/${id}`);
  } catch (err) {
    return localMockStore.getJobById(id);
  }
}

export async function getJobSkills(id) {
  try {
    return await apiClient.get(`/api/jobs/${id}/skills`);
  } catch (err) {
    return localMockStore.getJobSkills(id);
  }
}