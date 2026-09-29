import { apiClient } from "./client";
import { localMockStore } from "../mocks/mockStore";

export async function getStudents() {
  try {
    return await apiClient.get("/api/students");
  } catch (err) {
    return localMockStore.getStudents();
  }
}

export async function getStudentById(id) {
  try {
    return await apiClient.get(`/api/students/${id}`);
  } catch (err) {
    return localMockStore.getStudentById(id);
  }
}

export async function createStudent(studentData) {
  try {
    return await apiClient.post("/api/students", studentData);
  } catch (err) {
    return localMockStore.createStudent(studentData);
  }
}

export async function getStudentSkills(id) {
  try {
    return await apiClient.get(`/api/students/${id}/skills`);
  } catch (err) {
    return localMockStore.getStudentSkills(id);
  }
}

export async function addOrUpdateStudentSkill(id, skillData) {
  try {
    // Contract: POST /api/students/{id}/skills
    return await apiClient.post(`/api/students/${id}/skills`, skillData);
  } catch (err) {
    return localMockStore.addOrUpdateStudentSkill(id, skillData);
  }
}