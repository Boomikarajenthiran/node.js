// Configuration for API Base URL
// In development, points to Pure Java REST backend (e.g. http://localhost:8080)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Toggle mock mode manually or allow fallback
export const IS_MOCK_MODE_FORCED = import.meta.env.VITE_USE_MOCK === "true";