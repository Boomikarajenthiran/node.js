import { apiClient } from "./client";
import { localMockStore } from "../mocks/mockStore";

export async function getRecommendations(studentId, jobId) {
  try {
    // Contract: GET /api/students/{studentId}/jobs/{jobId}/recommendations
    return await apiClient.get(`/api/students/${studentId}/jobs/${jobId}/recommendations`);
  } catch (err) {
    return localMockStore.getRecommendations(studentId, jobId);
  }
}