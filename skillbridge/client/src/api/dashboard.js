import { apiClient } from "./client";
import { localMockStore } from "../mocks/mockStore";

export async function getDashboardStats() {
  try {
    return await apiClient.get("/api/dashboard/stats");
  } catch (err) {
    return localMockStore.getDashboardStats();
  }
}