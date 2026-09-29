import { apiClient } from "./client";
import { localMockStore } from "../mocks/mockStore";

export async function getApplications() {
  try {
    return await apiClient.get("/api/applications");
  } catch (err) {
    return localMockStore.getApplications();
  }
}

export async function createApplication(appData) {
  try {
    // Contract: POST /api/applications
    return await apiClient.post("/api/applications", appData);
  } catch (err) {
    return localMockStore.createApplication(appData);
  }
}