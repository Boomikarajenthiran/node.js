import { apiClient } from "./client";
import { localMockStore } from "../mocks/mockStore";

export async function getSkillGap(studentId, jobId) {
  try {
    // Contract: GET /api/students/{studentId}/jobs/{jobId}/skill-gap
    return await apiClient.get(`/api/students/${studentId}/jobs/${jobId}/skill-gap`);
  } catch (err) {
    return localMockStore.getSkillGap(studentId, jobId);
  }
}