import { API_BASE_URL, IS_MOCK_MODE_FORCED } from "./config";

// Central HTTP client that manages REST calls and fallback to mock data layer
class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.isMockActive = IS_MOCK_MODE_FORCED;
  }

  setMockMode(active) {
    this.isMockActive = active;
  }

  async request(endpoint, options = {}) {
    if (this.isMockActive) {
      throw new Error("MOCK_FALLBACK_TRIGGERED");
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData.message) errorMsg = errData.message;
          else if (errData.error) errorMsg = errData.error;
        } catch (_) {}
        throw new Error(errorMsg);
      }

      if (response.status === 204) return null;
      return await response.json();
    } catch (err) {
      // If network fails (e.g. Pure Java backend not yet started), trigger fallback
      console.warn(`[ApiClient] Request to ${url} failed, falling back to mock layer:`, err.message);
      throw err;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
}

export const apiClient = new ApiClient();