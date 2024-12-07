export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  if (!token) {
    throw new Error("User is not authenticated.");
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`, // Add Bearer token
    "Content-Type": "application/json", // Ensure JSON headers
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred.");
  }

  return response.json();
};
