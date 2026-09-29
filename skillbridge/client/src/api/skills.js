import { apiClient } from "./client";
import { localMockStore } from "../mocks/mockStore";

export async function getSkills() {
  try {
    return await apiClient.get("/api/skills");
  } catch (err) {
    return localMockStore.getSkills();
  }
}